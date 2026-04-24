import Question from "@/models/Question";
import Attempt from "@/models/Attempt";
import MockTest from "@/models/MockTest";

export const MCQService = {
  /* =========================
     PRACTICE QUESTIONS
  ========================= */
  async getPracticeQuestions(query: any) {
    const { subject, faculty, page = 1, limit = 20 } = query;

    const questions = await Question.find({
      subject,
      faculty,
    })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .select("-correctAnswer");

    return questions;
  },

  /* =========================
     GENERATE MOCK TEST
  ========================= */
  async generateMockTest(faculty: string) {
    const config = await MockTest.findOne({
      faculty,
      isActive: true,
    });

    if (!config) {
      const err: any = new Error("Mock test not found");
      err.statusCode = 404;
      throw err;
    }

    let questions: any[] = [];

    for (const sub of config.subjects) {
      const qs = await Question.aggregate([
        { $match: { faculty, subject: sub.subject } },
        { $sample: { size: sub.questionCount } },
      ]);

      questions.push(...qs);
    }

    // hide answers
    const safeQuestions = questions.map((q) => {
      delete q.correctAnswer;
      return q;
    });

    return {
      questions: safeQuestions,
      duration: config.duration,
      totalQuestions: config.totalQuestions,
      negativeMarking: config.negativeMarking,
      negativeValue: config.negativeValue,
    };
  },

  /* =========================
     SUBMIT ATTEMPT
  ========================= */
  async submitAttempt(userId: string, data: any) {
    const { answers, faculty, subject, type } = data;

    let correctCount = 0;
    let wrongCount = 0;
    let skippedCount = 0;

    const questionDetails: any[] = [];

    // ⚡ Optimize: fetch all questions at once
    const questionIds = answers.map((a: any) => a.questionId);

    const questions = await Question.find({
      _id: { $in: questionIds },
    });

    const questionMap = new Map(
      questions.map((q) => [q._id.toString(), q])
    );

    for (const ans of answers) {
      const question = questionMap.get(ans.questionId);

      if (!question) continue;

      const isCorrect =
        ans.selectedAnswer === question.correctAnswer;

      if (ans.selectedAnswer === null) {
        skippedCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }

      questionDetails.push({
        questionId: question._id,
        selectedAnswer: ans.selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
      });
    }

    // ⚠️ default negative marking (can upgrade later)
    const negativeValue = 0.25;

    const score = correctCount;
    const negativeMarks = wrongCount * negativeValue;
    const finalScore = score - negativeMarks;

    const attempt = await Attempt.create({
      userId,
      type,
      faculty,
      subject,

      questions: questionDetails,

      totalQuestions: answers.length,
      correctCount,
      wrongCount,
      skippedCount,

      score,
      negativeMarks,
      finalScore,

      startedAt: data.startedAt,
      submittedAt: new Date(),
    });

    return {
      attemptId: attempt._id,
      score: finalScore,
      correctCount,
      wrongCount,
      skippedCount,
    };
  },
};
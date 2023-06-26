export interface IUpdateExam {
    exam_questions_attributes?: Array<{
      id?: number; // Optional if creating a new exam question
      question_id?: number; // Optional if modifying an existing exam question
      score?: number;
      _destroy?: boolean; // Optional flag to mark an existing exam question for deletion
    }>;
  }
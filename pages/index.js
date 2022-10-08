import dbConnect from "../lib/dbConnect";
import Question from "../models/Question";
import QuestionsCard from "../components/QuestionCard";

async function getAllQuestions() {
  await dbConnect();
  const questions = await Question.find();
  const sanitizedQuestions = questions.map((question) => ({
    id: question.id,
    answer: question.answer,
    question: question.question,
    options: question.options,
  }));
  return sanitizedQuestions;
}

export async function getServerSideProps() {
  const questions = await getAllQuestions();

  return {
    props: { questions: questions },
  };
}

export default function Home({ questions }) {
  return (
    <main>
      <h1>All questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionsCard
            key={question.id}
            question={question.question}
            answer={question.answer}
            options={question.options}
          />
        ))}
      </ul>
    </main>
  );
}

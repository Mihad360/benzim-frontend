/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Divider, Tag } from "antd";
import ModalImage from "react-modal-image";

const QuizCookResultDetailsModal = ({
  open,
  onCancel,
  quizResult,
}: {
  open: boolean;
  onCancel: () => void;
  quizResult: any;
}) => {
  if (!quizResult) return null;

  const {
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    results,
    verifyCookInfo,
    createdAt,
  } = quizResult;

  return (
    <Modal
      title="Quiz Result Details"
      open={open}
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>Close</Button>}
      width={700}
      centered
    >
      <div className="space-y-5 p-2">
        {/* Quiz Summary */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Total Questions</p>
            <p className="text-xl font-bold">{totalQuestions}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Correct</p>
            <p className="text-xl font-bold text-blue-600">{correctAnswers}</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-sm text-gray-500">Wrong</p>
            <p className="text-xl font-bold text-red-600">{wrongAnswers}</p>
          </div>
        </div>

        <Divider />

        {/* Question-wise Results */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Question Results</h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
            {results.map((item: any, index: number) => (
              <div key={index} className="border rounded-md p-3 text-sm">
                <p className="font-medium mb-1">
                  Q{index + 1}: {item.question}
                </p>

                <p>
                  <span className="font-medium">Selected:</span>{" "}
                  {item.selectedAnswer}
                </p>

                <p>
                  <span className="font-medium">Correct:</span>{" "}
                  {item.correctAnswer}
                </p>

                <Tag color={item.isCorrect ? "green" : "red"} className="mt-1">
                  {item.isCorrect ? "Correct" : "Wrong"}
                </Tag>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* Verification Info */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">
            Cook Verification Information
          </h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium">Owner Name:</span>{" "}
              {verifyCookInfo.ownerName || "N/A"}
            </p>

            <p>
              <span className="font-medium">Business Number:</span>{" "}
              {verifyCookInfo.businessNumber}
            </p>

            <p>
              <span className="font-medium">Valid ID Type:</span>{" "}
              {verifyCookInfo.validIdType}
            </p>

            <p>
              <span className="font-medium">Self ID Type:</span>{" "}
              {verifyCookInfo.selfIdType || "N/A"}
            </p>
          </div>

          {/* Images */}
          <div className="mt-4 grid grid-cols-2 gap-6">
            <div>
              <p className="font-medium mb-2">Valid ID</p>
              <ModalImage
                small={verifyCookInfo.validIdUrl}
                large={verifyCookInfo.validIdUrl}
                alt="Valid ID"
              />
            </div>

            {verifyCookInfo.selfIdUrl && (
              <div>
                <p className="font-medium mb-2">Self Verification</p>
                <ModalImage
                  small={verifyCookInfo.selfIdUrl}
                  large={verifyCookInfo.selfIdUrl}
                  alt="Self ID"
                />
              </div>
            )}
          </div>
        </div>

        <Divider />

        {/* Meta */}
        <div className="text-xs text-gray-500 text-right">
          Submitted on: {new Date(createdAt).toLocaleString()}
        </div>
      </div>
    </Modal>
  );
};

export default QuizCookResultDetailsModal;

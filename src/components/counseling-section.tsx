import { Clock } from "lucide-react";
import CounselingForm from "./counseling-form";

const CounselingSection = () => {
  return (
    <section
      className="py-16 bg-black text-white relative overflow-hidden"
      id="counseling"
    >
      {/* 背景グラデーション */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-black"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 左側: 特徴と利点 */}
          <div className="bg-gray-900/60 backdrop-blur-sm p-8 rounded-2xl border border-gray-800">
            <div className="mb-12">
              <h2 className="text-5xl font-bold text- mb-4">
                無料カウンセリングへ
                <br />
                ご参加ください！
              </h2>
              <div className="h-1 w-32 bg-blue-500 mx- mb-6"></div>
            </div>
            <h3 className="text-2xl font-semibold mb-6 text-blue-400">
              ざっくばらんに、オンラインで相談！
            </h3>

            <ul className="space-y-6">
              <li className="flex items-center">
                <div className="bg-blue-500/60 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">📝</span>
                </div>

                <h4 className="font-medium text-lg">
                  サービス内容を詳しく聞きたい
                </h4>
              </li>
              <li className="flex items-center">
                <div className="bg-blue-500/60 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">🤔</span>
                </div>
                <h4 className="font-medium text-lg">
                  自分に向いているかわからない
                </h4>
              </li>
              <li className="flex items-center">
                <div className="bg-blue-500/60 rounded-full w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-2xl">⭐️</span>
                </div>
                <h4 className="font-medium text-lg">入会を検討している</h4>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-700 flex items-center">
              <Clock className="h-6 w-6 text-blue-400 mr-3" />
              <span className="text-gray-300">リアルタイムで疑問を解消</span>
            </div>
          </div>

          {/* 右側: 予約フォーム */}
          <CounselingForm />
        </div>
      </div>
    </section>
  );
};

export default CounselingSection;

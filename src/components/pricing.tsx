import { Check } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const features = [
  "フルスタックWeb開発カリキュラム",
  "講師によるライブコーディングセッション",
  "個人プロジェクトポートフォリオ作成",
  "1対1のメンタリングセッション",
  "無期限の就職サポート",
];

const Pricing = () => {
  return (
    <section className="py-20 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-center mb-4">
            <span className="relative inline-block">
              利用料
              <span className="absolute bottom-0 left-0 w-full h-2 bg-green-500 opacity-30"></span>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            追加料金や隠れたコストはありません。
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-baseline justify-center mt-4">
                <span className="text-5xl font-bold">¥180,000</span>
                <span className="ml-2 text-gray-500">/ 6ヶ月</span>
              </div>
              <p className="text-center text-gray-500 mt-2">
                分割払いも可能: 月々¥15,000 x 12回
              </p>
            </div>

            <div className="p-8">
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  size={"lg"}
                  className="w-full !py-8 rounded-lg font-bold text-lg"
                  asChild
                >
                  <Link href={"#counseling"}>今すぐ申し込む</Link>
                </Button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                1週間の100%返金保証
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

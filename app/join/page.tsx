import { TextPage } from "@/components/TextPage";
import { SITE } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "掲載を希望するインストラクターの方へ（取材のご案内）",
  description: `${SITE.name}での取材・掲載を希望するヨガ・ピラティスインストラクターの方へのご案内です。`,
  path: "/join/",
});

export default function JoinPage() {
  return (
    <TextPage
      crumbs={[{ href: "/join/", label: "掲載を希望する先生の方へ" }]}
      en="For teachers"
      title="掲載を希望する先生の方へ"
      lead={<p>読んだ人が「この先生なら通えそう」と思える相手を見つけられるように、教え方と人柄を、ご本人の言葉で届けたいと考えています。</p>}
    >
      <section aria-labelledby="who">
        <h2 id="who">取材をお願いしたい方</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>ヨガスタジオ、ピラティススタジオ、フィットネスクラブなどで、レッスンを教えている方。フリーランスの方も歓迎します。</li>
          <li>流派や資格の種類、教えている相手の年齢・経験は問いません。</li>
        </ul>
      </section>

      <section aria-labelledby="flow">
        <h2 id="flow">取材の流れ</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>お問い合わせフォームからご連絡ください。教えているレッスンの種類とスタジオ、ご連絡先をお書き添えください。</li>
          <li>内容を確認して、こちらからご連絡します。取材の日時と進め方をご相談させてください。</li>
          <li>お話を伺い、原稿にまとめます。</li>
          <li>原稿をご確認いただいてから公開します。</li>
        </ol>
      </section>

      <section aria-labelledby="contact">
        <h2 id="contact">ご連絡先</h2>
        <p>
          <a href={SITE.contactUrl} target="_blank" rel="noopener" className="link">
            お問い合わせフォーム<span aria-hidden="true">↗</span>
            <span className="sr-only">（新しいタブで開きます）</span>
          </a>
        </p>
      </section>
    </TextPage>
  );
}

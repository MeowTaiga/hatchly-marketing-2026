import { FAQS } from '../seo/site';
import { SectionWave } from './Waves';

/** Answer-engine friendly FAQ — plain disclosure list, no card clutter. */
export function FaqSection() {
  return (
    <section className="panel panel-butter faq-panel" aria-labelledby="faq-heading" id="faq">
      <SectionWave fill="#fff4e8" variant={4} />
      <div className="panel-inner">
        <h2 className="wavey-title" id="faq-heading">
          Questions people ask
          <span className="swash" aria-hidden="true" />
        </h2>
        <p className="lead">
          Straight answers about Hatchly — the habit pet app, AI chat, wellness tools, and beta.
        </p>

        <div className="faq-list">
          {FAQS.map((faq) => (
            <details key={faq.question} className="faq-item">
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

import double_arrow from "../../assets/icons/translate-double-arrow.png";
import "./TranslatePanel.css";

function TranslatePanel() {
  return (
    <div className="translate-panel d-flex align-items-center">
      <section>
        <div className="d-flex flex-row justify-content-between">
          <h3 className="translate-font translate-element col-5">Urdu</h3>
          <h3 className="translate-font translate-element col-5">German</h3>
        </div>
        <div>
          <form>
            <div className="d-flex flex-row justify-content-between">
              <textarea
                className="col-5 mt-2 translate-text-area"
                placeholder="Urdu mathan yahan darj karein"
              />
              <textarea
                className="col-5 mt-2 translate-text-area"
                placeholder="German tarjuma"
              />
            </div>
            <h5 className="translate-btn translate-font mt-3">Tarjuma karein</h5>
            <div className="translate-btn translate-font mt-3">
              <img src={double_arrow} alt="double arrow" />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default TranslatePanel;

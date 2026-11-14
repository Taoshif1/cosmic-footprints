import type { MissionDataVisualization } from "../../data/artifacts";

interface MissionDataChartProps {
  data: MissionDataVisualization;
}

export function MissionDataChart({ data }: MissionDataChartProps) {
  const total = data.records.reduce((sum, record) => sum + record.value, 0);
  const maximum = Math.max(...data.records.map((record) => record.value), 1);

  return (
    <section className="story-panel-section mission-data-section">
      <p className="story-section-index">NASA DATA / MISSION MEASUREMENTS</p>
      <h2>{data.title}</h2>
      <p>{data.description}</p>

      <div className="mission-data-total">
        <span>COMBINED DISTANCE TRAVELLED</span>
        <strong>
          {total.toFixed(1)}
          <small>{data.unit}</small>
        </strong>
      </div>

      <div
        className="mission-data-chart"
        role="group"
        aria-label="Lunar rover distance travelled by Apollo mission"
      >
        {data.records.map((record) => {
          const percentage = (record.value / maximum) * 100;

          return (
            <div className="mission-data-row" key={record.label}>
              <div className="mission-data-row-heading">
                <span>{record.label}</span>
                <strong>
                  {record.value.toFixed(1)} {data.unit}
                </strong>
              </div>

              <div
                className="mission-data-track"
                role="meter"
                aria-label={`${record.label} distance travelled`}
                aria-valuemin={0}
                aria-valuemax={maximum}
                aria-valuenow={record.value}
              >
                <span style={{ width: percentage + "%" }} />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mission-data-method">
        Values are transcribed from the NASA NSSDCA mission record. The
        combined distance is the sum of the three reported mission totals.
      </p>

      <a
        className="mission-data-source"
        href={data.sourceUrl}
        target="_blank"
        rel="noreferrer"
      >
        <span>
          DATA SOURCE
          <strong>{data.sourceLabel}</strong>
        </span>
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

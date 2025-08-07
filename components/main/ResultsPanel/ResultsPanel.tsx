import { memo, type FC } from 'react';
import { ResultsPanelProps } from './types';

export const ResultsPanel: FC<ResultsPanelProps> = memo(
  ({ status, results }) => {
    if (status === 'Error') {
      return (
        <div>
          <h2>Error</h2>
        </div>
      );
    }

    if (status === 'Loading') {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }

    const totalCount = Object.values(results).reduce(
      (acc, curr) => acc + curr,
      0
    );

    return (
      <div className="w-full">
        <h3 className="text-xl">{`Results (${totalCount})`}</h3>
        <p className="text-gray-400 text-sm">Option: votes count</p>

        <div className="flex flex-col gap-2">
          {Object.entries(results).map((result) => {
            const percents = (result[1] / totalCount) * 100;

            return (
              <div key={result[0]}>
                <div>{`${result[0]}: ${result[1]} (${percents.toFixed(2)}%)`}</div>
                <div className="bg-blue-50 rounded-3xl overflow-hidden">
                  <div
                    className="bg-blue-500 h-2"
                    style={{ width: result[1] > 0 ? `${percents}%` : '0%' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

ResultsPanel.displayName = 'ResultsPanel';

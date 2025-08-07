import { memo, type FC } from 'react';
import type { PresencePanelProps } from './types';

export const PresencePanel: FC<PresencePanelProps> = memo(
    ({ status, users, onlineCount }) => {
        if (status === 'Error') {
            return (
                <div role="alert" className="p-4">
                    <p>Error loading users</p>
                </div>
            );
        }

        if (status === 'Loading') {
            return (
                <div role="status" aria-live="polite" className="p-4">
                    <p>Loading...</p>
                </div>
            );
        }

        return (
            <section aria-labelledby="online-users-heading">
                <h2 id="online-users-heading" className="text-xl">
                    Online ({onlineCount})
                </h2>

                <ul
                    role="list"
                    aria-label={`${onlineCount} users currently online`}
                    className="mt-2"
                >
                    {users.map((user, index) => (
                        <li
                            key={index}
                            className="max-w-full overflow-hidden text-ellipsis"
                            title={user}
                        >
              <span aria-label={`User ${user} is online`}>
                {user}
              </span>
                        </li>
                    ))}
                </ul>
            </section>
        );
    }
);

PresencePanel.displayName = 'PresencePanel';
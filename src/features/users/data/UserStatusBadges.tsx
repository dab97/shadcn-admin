import { UserStatus } from './schema'
import { callTypes } from './data'

export const UserStatusBadges = ({ statuses }: { statuses: UserStatus }) => (
  <div className="flex flex-wrap gap-1.5">
    {statuses.map((status) => {
      const styles = callTypes.get(status) || 'bg-gray-100 text-gray-600'
      return (
        <span
          key={status}
          className={`px-2 py-1 rounded-md text-xs border ${styles}`}
        >
          {status}
        </span>
      )
    })}
  </div>
)
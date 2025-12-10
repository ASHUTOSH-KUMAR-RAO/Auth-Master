"use client";

import { Logout } from "@/action/logout";
import { useCurrentUser } from "@/hooks/use-current-users";

const SettingsPage = () => {
  const user = useCurrentUser();

  const OnClick = () => {
    Logout();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      <button type="submit" onClick={OnClick}>
        Sign Out
      </button>
    </div>
  );
};

export default SettingsPage;

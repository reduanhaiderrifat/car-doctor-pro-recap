"use client";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect } from "react";

const Page = () => {
  const session = useSession();

  const sendNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Hellow Developers", {
        body: "This is a notification",
        icon: `${session?.data?.user?.image}`,
      });
    }
  };
  const requestNotification = useCallback(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("massege send");
          sendNotification();
        }
      });
    }
  }, []);
  useEffect(() => {
    if ("Notification" in window) {
      requestNotification();
    }
  }, [requestNotification]);
  return (
    <div>
      this is about page{" "}
      <button onClick={sendNotification} className="btn btn-primary">
        Notification
      </button>
    </div>
  );
};

export default Page;

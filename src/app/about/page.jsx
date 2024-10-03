"use client";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect } from "react";

const Page = () => {
  const { data: session } = useSession();

  const sendNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Hello Developers", {
        body: "This is a notification",
        icon: session?.user?.image || "https://ibb.co.com/Tkq3PcP", // Fallback to a default icon
      });
    }
  };

  const requestNotification = useCallback(() => {
    if ("Notification" in window) {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === "granted") {
            console.log("Message sent");
            sendNotification();
          }
        })
        .catch((error) => {
          console.error("Notification permission error:", error); // Handle errors
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
      <p>This is the about page</p>
      <button onClick={sendNotification} className="btn btn-primary">
        Send Notification
      </button>
    </div>
  );
};

export default Page;

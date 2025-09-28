import { useUser, useSession } from "@descope/react-sdk";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const ValidateUser = () => {
  const { isAuthenticated, isSessionLoading } = useSession();
  const { user, isUserLoading } = useUser();
}

export {ValidateUser}
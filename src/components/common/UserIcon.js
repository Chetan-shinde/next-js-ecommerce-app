"use client";
import Image from "next/image";
import userImg from "../../../public/images/user.svg";
import { AppState } from "@/context/Context";
import Link from "next/link";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { makeRequest } from "@/util";

const fetcher = (url) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
  }).then((data) => data.json());

export default function UserIcon() {
  const searchParams = useSearchParams();
  const login = searchParams.get("login");

  const { state, dispatch } = AppState();

  function handleClick() {
    dispatch({ type: "OPEN_LOGIN_MODAL" });
    /* var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Secret XMFXYE9KR6V32952CSSNJHJ43GJ376W2"
    );

    var raw = JSON.stringify({
      Data: {
        AgentId: null,
        ClinicId: 44797,
        PatientId: 21513307,
        ClinicianId: 274825,
        StatusDetails: "Prescription sent",
        PrescriptionId: 59373093,
        StatusDateTime: "2024-01-04T07:18:33.0825748Z",
        PrescriptionStatus: 4,
        RelatedRxChangeQueueItemId: null,
        RelatedRxRequestQueueItemId: null,
      },
      EventType: "PrescriptionResult",
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    var raw1 = JSON.stringify({
      Data: {
        AgentId: null,
        ClinicId: 44797,
        PatientId: 21513307,
        ClinicianId: 274825,
        StatusDetails: "Prescription sent",
        PrescriptionId: 59373093,
        StatusDateTime: "2024-01-04T07:18:33.0825748Z",
        PrescriptionStatus: 13,
        RelatedRxChangeQueueItemId: null,
        RelatedRxRequestQueueItemId: null,
      },
      EventType: "PrescriptionResult",
    });

    var requestOptions1 = {
      method: "POST",
      headers: myHeaders,
      body: raw1,
      redirect: "follow",
    };

    fetch(
      "https://usa_csrpanel.dev-projects.local/orders/callback?type=dosespot",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    fetch(
      "https://usa_csrpanel.dev-projects.local/orders/callback?type=dosespot",
      requestOptions1
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error)); */
  }

  useEffect(() => {
    if (login) {
      handleClick();
    }
  }, []);

  if (state.user_logged_in) {
    return (
      <li>
        <Link href="/dashboard">
          <Image src={userImg} alt="" />
        </Link>
      </li>
    );
  }

  return (
    <li>
      <Link href="#" onClick={handleClick}>
        <Image src={userImg} alt="" />
      </Link>
    </li>
  );
}

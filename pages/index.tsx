import Head from "next/head";
import Image from "next/image";
import PrimarySearchAppBar from "../layout/AppBar";
import styles from "../styles/Home.module.css";
import TemporaryDrawer from "../layout/AppDrawer";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useContext } from "react";
import { IKContext } from "../context/context";
import { setLoading, setUser } from "../context/reducer";
import { Router, useRouter } from "next/dist/client/router";
import useGetAuthState from "../hooks/useGetAuthState";
import NoteList from "../components/noteList/NoteList";

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Notes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PrimarySearchAppBar />
      <TemporaryDrawer />
      <NoteList />
    </div>
  );
}

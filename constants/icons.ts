import activity from "@/assets/icons/activity.png";
import add from "@/assets/icons/add.png";
import adobe from "@/assets/icons/adobe.png";
import back from "@/assets/icons/back.png";
import canva from "@/assets/icons/canva.png";
import claude from "@/assets/icons/claude.png";
import dropbox from "@/assets/icons/dropbox.png";
import figma from "@/assets/icons/figma.png";
import github from "@/assets/icons/github.png";
import home from "@/assets/icons/home.png";
import medium from "@/assets/icons/medium.png";
import menu from "@/assets/icons/menu.png";
import notion from "@/assets/icons/notion.png";
import openai from "@/assets/icons/openai.png";
import plus from "@/assets/icons/plus.png";
import setting from "@/assets/icons/setting.png";
import spotify from "@/assets/icons/spotify.png";
import wallet from "@/assets/icons/wallet.png";
import click from "@/assets/icons/camera.png";
import folder from "@/assets/icons/folder.png";
import imgscan from "@/assets/icons/imgscan.png";
import ctscan from "@/assets/icons/ctscan.png";
import barscan from "@/assets/icons/barscan.png";

import sleep from "@/assets/icons/sleep.png";
import bloodpressure from "@/assets/icons/bloodpressure.png";
import heartgood from "@/assets/icons/heartgood.png";
import heartmixed from "@/assets/icons/heartmixed.png";
import heartrate from "@/assets/icons/heartrate.png";
import walks from "@/assets/icons/walks.png";
import heartbad from "@/assets/icons/heartbad.png";
import calories from "@/assets/icons/calories.png";

import bluecircle from "@/assets/icons/bluecircle.png";
import yellowcircle from "@/assets/icons/yellowcircle.png";
import greencircle from "@/assets/icons/greencircle.png";
import redcircle from "@/assets/icons/redcircle.png";

import completed from "@/assets/icons/completed.png";
import notcompleted from "@/assets/icons/notcompleted.png";

import google from "@/assets/icons/google.png";

import apple from "@/assets/icons/apple.png";

import logo from "@/assets/icons/logo.png";


export const icons = {
    logo,
    apple,
    google,
    completed,
    notcompleted,
    bluecircle,
    yellowcircle,
    greencircle,
    redcircle,
    sleep,
    bloodpressure,
    heartgood,
    heartmixed,
    heartrate,
    calories,
    walks,
    heartbad,
    home,
    wallet,
    setting,
    activity,
    add,
    back,
    menu,
    plus,
    notion,
    dropbox,
    openai,
    adobe,
    medium,
    figma,
    spotify,
    github,
    claude,
    canva,
    click,
    folder,
    barscan,
    ctscan,
    imgscan,
} as const;

export type IconKey = keyof typeof icons;
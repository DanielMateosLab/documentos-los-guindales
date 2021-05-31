# documentos-los-guindales

Live version [here](https://documentos-los-guindales.vercel.app/)

## What is documentos-los-guindales

This is a small app developed for an association in Algatocín (Málaga) in Spain.
In the context of the COVID-19 restrictions, sometimes a safe-conduct document was needed to travel
between municipalities of Andalusia. This document could be issued by associations like Los Guindales
(the app requestor) for certain reasons like education events.

"documentos-los-guindales" helped the association to issue the documents fast and in a digital PDF version so they could send them easily to the event participants by whatsapp, telegram or email.

The ammount of time they saved using this app instead of printing, filling and scanning the documents; as they did in the past, was huge.

## Features

- Straightforward form to populate the safe-conduct dynamic fields
- Form validation
- Form date field is saved in memory store to increase productivity
- Generate pdf documents (with javascript in node!)

## Tech stack

Highlighted: Typescript, NextJS (Node), React, Material UI, Pdfkit and Jest. For more information look in [package.json](./package.json)

## A note about privacity

Although Los Guindales has allowed me to leave public some of its data in this repository, they do not want anybody to use it. I hope you do not do so. If I had known I was gonna leave this repository public in advance, I would have stored sensible data in environment variables, which I should have done since the beggining.

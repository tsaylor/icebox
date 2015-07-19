#!/bin/bash

rm -rf _build/
mkdir -p _build/icebox

cp background.js _build/icebox/
cp handlebars* _build/icebox/
cp icebox.html _build/icebox/
cp icebox.js _build/icebox/
cp options.html _build/icebox/
cp options.js _build/icebox/
cp icon* _build/icebox/
cp manifest.json _build/icebox/
cp sandbox.html _build/icebox/

cd _build
zip icebox.zip icebox/*
rm -rf icebox/
cd ..

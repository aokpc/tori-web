#!/bin/bash

git checkout --orphan orphan_branch
git commit -am "Initial commit"
git branch -D main
git branch -m main
git push -f origin main
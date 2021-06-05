#!/bin/bash
# Copyright 2017 gRPC authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# Deleting Ruby.
rm -rf ~/.rvm

set -e
cd $(dirname $0)/..

OS=$(uname)
if [ "$OS" = "Darwin" ]
then
  brew install make
  PATH="$(brew --prefix)/opt/make/libexec/gnubin:$PATH"
fi

# Install gRPC and its submodules.
git submodule update --init --recursive

./packages/grpc-native-core/tools/buildgen/generate_projects.sh

./run-tests.sh

/*
 * Copyright 2017 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import * as gulp from 'gulp';
import * as healthCheck from './packages/grpc-health-check/gulpfile';
import * as jsCore from './packages/grpc-js/gulpfile';
import * as protobuf from './packages/proto-loader/gulpfile';
import * as internalTest from './test/gulpfile';

const installAll = gulp.series(jsCore.install, healthCheck.install, protobuf.install, internalTest.install);

const lint = gulp.parallel(jsCore.lint);

const build = gulp.series(jsCore.compile, protobuf.compile);

const setup = gulp.series(installAll);

const setupPureJSInterop = gulp.series(jsCore.install, protobuf.install, internalTest.install);

const clean = gulp.series(jsCore.clean, protobuf.clean);

const cleanAll = gulp.series(jsCore.cleanAll, internalTest.cleanAll, protobuf.cleanAll);

const nativeTestOnly = gulp.parallel(healthCheck.test);

const nativeTest = gulp.series(build, nativeTestOnly);

const testOnly = gulp.parallel(jsCore.test, nativeTestOnly, protobuf.test);

const test = gulp.series(build, testOnly, internalTest.test);

export {
  installAll,
  lint,
  build,
  setup,
  setupPureJSInterop,
  clean,
  cleanAll,
  nativeTestOnly,
  nativeTest,
  test
};

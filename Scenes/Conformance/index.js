'use strict';

import React from 'react';
import { Platform } from 'react-native';

global.Buffer = require('buffer/').Buffer;

import GLTestReporter from './GLTestReporter';


// `_` defines a regular test.
// `S_` defines a test that gets skipped.
// `I_` defines a test that gets skipped only on iOS.
// If any test is defined using `O_`, all tests not defined using `O_` are skipped.
//
// All forms take an additional array argument with indices of checks that are
// ok to fail on due to expected non-conformance

const _ = (test, skipChecks) => (test.skipChecks = skipChecks, test);
const S_ = (test, ...args) => (test.skip = true, _(test, ...args));
const I_ = (test, ...args) => (test.skip = Platform.OS === 'ios', _(test, ...args));
const O_ = (test, ...args) => (test.only = true, _(test, ...args));

const filter = (tests) => {
  const noSkip = tests.filter(test => !test.skip);
  const only = noSkip.filter(test => test.only);
  return only.length > 0 ? only : noSkip;
};

const tests = filter([
  //// DONE

  // more_conformance
  _(require('@exponent/gl-conformance/node-test/more_conformance_constants')),
  _(require('@exponent/gl-conformance/node-test/more_conformance_getContext')),
  _(require('@exponent/gl-conformance/node-test/more_conformance_methods')),
  _(require('@exponent/gl-conformance/node-test/more_conformance_webGLArrays'), [
    // TODO(nikki, sdk12): Figure this out...
    198, 200, 201, // https://github.com/stackgl/gl-conformance/blob/cfb4649b21cd138c3a6870d4534422287e054d3f/sdk/tests/conformance/more/conformance/webGLArrays.html#L157-L16
  ]),

  // more_functions
  _(require('@exponent/gl-conformance/node-test/more_functions_bindBuffer')),
  _(require('@exponent/gl-conformance/node-test/more_functions_bufferData')),
  _(require('@exponent/gl-conformance/node-test/more_functions_bufferSubData')),
  _(require('@exponent/gl-conformance/node-test/more_functions_readPixels')),
  _(require('@exponent/gl-conformance/node-test/more_functions_texImage2D')),
  _(require('@exponent/gl-conformance/node-test/more_functions_uniformMatrix')),
  _(require('@exponent/gl-conformance/node-test/more_functions_uniformf')),
  _(require('@exponent/gl-conformance/node-test/more_functions_uniformfArrayLen1')),
  _(require('@exponent/gl-conformance/node-test/more_functions_uniformi')),
  _(require('@exponent/gl-conformance/node-test/more_functions_vertexAttrib')),
  _(require('@exponent/gl-conformance/node-test/more_functions_vertexAttribPointer')),
  _(require('@exponent/gl-conformance/node-test/more_functions_drawArrays'), [
    // `gl.drawArrays(...)` doesn't throw an error for bad arguments
    14, 15, // https://github.com/KhronosGroup/WebGL/blob/18b5d44c5372dc36b78a2d229d3612bdce3aec9a/sdk/tests/conformance/more/functions/drawArrays.html#L92-L93
    20, 21, // https://github.com/KhronosGroup/WebGL/blob/18b5d44c5372dc36b78a2d229d3612bdce3aec9a/sdk/tests/conformance/more/functions/drawArrays.html#L100-L101
  ]),
  _(require('@exponent/gl-conformance/node-test/more_functions_drawElements'), [
    // `gl.drawElements(...)` doesn't throw an error for bad arguments
    14, 15, // https://github.com/stackgl/gl-conformance/blob/cfb4649b21cd138c3a6870d4534422287e054d3f/sdk/tests/conformance/more/functions/drawElements.html#L95-L98
    20, 21, // https://github.com/stackgl/gl-conformance/blob/cfb4649b21cd138c3a6870d4534422287e054d3f/sdk/tests/conformance/more/functions/drawElements.html#L106-L109
  ]),

  // buffers
  _(require('@exponent/gl-conformance/node-test/buffers_buffer-bind-test'), [
    // No `gl.INVALID_OPERATION` when binding buffer to different target
    4, // https://github.com/stackgl/gl-conformance/blob/cfb4649b21cd138c3a6870d4534422287e054d3f/sdk/tests/conformance/buffers/buffer-bind-test.html#L64
    7, // https://github.com/stackgl/gl-conformance/blob/cfb4649b21cd138c3a6870d4534422287e054d3f/sdk/tests/conformance/buffers/buffer-bind-test.html#L75
  ]),
  _(require('@exponent/gl-conformance/node-test/buffers_buffer-data-array-buffer-delete')),
  _(require('@exponent/gl-conformance/node-test/buffers_buffer-data-array-buffer'), [
    // `null` data argument to `gl.bufferData(...)` is ok
    7, // https://github.com/stackgl/gl-conformance/blob/cfb4649b21cd138c3a6870d4534422287e054d3f/conformance-suites/1.0.3/conformance/buffers/buffer-data-array-buffer.html#L65-L66
  ]),
  S_(require('@exponent/gl-conformance/node-test/buffers_element-array-buffer-delete-recreate')),
  S_(require('@exponent/gl-conformance/node-test/buffers_index-validation-copies-indices')),
  S_(require('@exponent/gl-conformance/node-test/buffers_index-validation-crash-with-buffer-sub-data')),
  S_(require('@exponent/gl-conformance/node-test/buffers_index-validation-large-buffer')),
  S_(require('@exponent/gl-conformance/node-test/buffers_index-validation-verifies-too-many-indices')),
  S_(require('@exponent/gl-conformance/node-test/buffers_index-validation-with-resized-buffer')),
  S_(require('@exponent/gl-conformance/node-test/buffers_index-validation')),

  // attribs
  S_(require('@exponent/gl-conformance/node-test/attribs_gl-bindAttribLocation-aliasing')),
  S_(require('@exponent/gl-conformance/node-test/attribs_gl-bindAttribLocation-matrix')),
  S_(require('@exponent/gl-conformance/node-test/attribs_gl-disabled-vertex-attrib')),
  S_(require('@exponent/gl-conformance/node-test/attribs_gl-enable-vertex-attrib')),
  S_(require('@exponent/gl-conformance/node-test/attribs_gl-matrix-attributes')),
  S_(require('@exponent/gl-conformance/node-test/attribs_gl-vertex-attrib-render')),
  S_(require('@exponent/gl-conformance/node-test/attribs_gl-vertex-attrib-zero-issues')),
  S_(require('@exponent/gl-conformance/node-test/attribs_gl-vertex-attrib')),
  S_(require('@exponent/gl-conformance/node-test/attribs_gl-vertexattribpointer-offsets')),
  _(require('@exponent/gl-conformance/node-test/attribs_gl-vertexattribpointer'), [
    // No `gl.getError()` error on bad arguments
    2, 3, 4, 5, 13, 27, 53, 67, 93, 107, 133, 147, 173, 187, 213, 227, 253, 267,
    293, 307, 327, 328, 330, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342,
    343, 344, 345, 347, 348, 350, 352, 353, 354, 355, 356, 357, 359, 360, 362,
    365, 366, 368, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382,
    383, 385, 386, 388, 390, 391, 392, 393, 394, 395, 397, 398, 400, 403, 404,
    406, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 423,
    424, 426, 428, 429, 430, 431, 432, 433, 435, 436, 438, 441, 442, 444, 447,
    448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 461, 462, 464,
    466, 467, 468, 469, 470, 471, 473, 474, 476, 479, 480, 482, 485, 486, 487,
    488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 499, 500, 502, 504, 505,
    506, 507, 508, 509, 511, 512, 514, 517, 518, 520, 523, 524, 525, 526, 527,
    528, 529, 530, 531, 532, 533, 534, 535, 537, 538, 540, 542, 543, 544, 545,
    546, 547, 549, 550, 552, 555, 556, 558, 561, 562, 563, 564, 565, 566, 567,
    568, 569, 570, 571, 572, 573, 575, 576, 578, 580, 581, 582, 583, 584, 585,
    587, 588, 590, 593, 594, 596, 599, 600, 601, 602, 603, 604, 605, 606, 607,
    608, 609, 610, 611, 613, 614, 616, 618, 619, 620, 621, 622, 623, 625, 626,
    628, 631, 632, 634, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647,
    648, 649, 651, 652, 654, 656, 657, 658, 659, 660, 661, 663, 664, 666, 669,
    670, 672, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687,
    689, 690, 692, 694, 695, 696, 697, 698, 699, 701, 702, 704, 707, 708, 710,
    713, 714, 715, 716, 717, 718, 719, 720, 721, 722, 723, 724, 725, 727, 728,
    730, 732, 733, 734, 735, 736, 737, 739, 740, 742, 745, 746, 748, 751, 752,
    753, 754, 755, 756, 757, 758, 759, 760, 761, 762, 763, 765, 766, 768, 770,
    771, 772, 773, 774, 775, 777, 778, 780,
  ]),


  //// TODO

  // TODO(nikki, sdk12): Implement functions used in these...
  S_(require('@exponent/gl-conformance/node-test/more_functions_isTests')),
  S_(require('@exponent/gl-conformance/node-test/more_functions_texSubImage2D')),
  S_(require('@exponent/gl-conformance/node-test/more_functions_copyTexImage2D')),
  S_(require('@exponent/gl-conformance/node-test/more_functions_copyTexSubImage2D')),
  S_(require('@exponent/gl-conformance/node-test/more_functions_bindFramebufferLeaveNonZero')),
]);


export default class Conformance extends React.Component {
  static meta = {
    description: `Khronos' WebGL Spec Conformance Test`,
  };

  render() {
    // `GLTestReporter` expects a map of the form `{ [name]: test ... }`
    return (
      <GLTestReporter
        {...this.props}
        testCases={Object.assign(...tests.map((test => ({ [test.name]: test }))))}
      />
    );
  }
}

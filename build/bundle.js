/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var FLAG_ALL_ON = true;
var FLAG_REQUEST_ANIMATION_FRAME = false || FLAG_ALL_ON;
var FLAG_DEBUG_RENDER = false;
var FLAG_CENTER_TEXT = false || FLAG_ALL_ON;
var FLAG_EMOJI_CHARACTERS = false || FLAG_ALL_ON;
var FLAG_COLLECTIBLES = true || FLAG_ALL_ON;
var FLAG_OBSTACLES = true || FLAG_ALL_ON;
var FLAG_ALLOW_ROTATION = false || FLAG_ALL_ON;
var FLAG_CHANGE_FONT = false || FLAG_ALL_ON;
var FLAG_USE_MAX_DIFF = true && FLAG_REQUEST_ANIMATION_FRAME || FLAG_ALL_ON;
var FLAG_SMOOTH_SCROLL = false || FLAG_ALL_ON;
var FLAG_ALWAY_CHECK_WIDTH = false;
var FLAG_MEASURE_TILE_WIDTH = false || FLAG_ALL_ON;
var FLAG_MEASURE_ENTITY_WIDTH = false || FLAG_ALL_ON;
var FLAG_NICE_JUMPS = false || FLAG_ALL_ON;
var FLAG_AGGREGATE_KEY_LISTENERS = false;
var FLAG_SCALE_PERFORMANCE = false || FLAG_ALL_ON;
var FLAG_HEADBUTT = true || FLAG_ALL_ON;
var FLAG_UPGRADE = true || FLAG_ALL_ON;
var FLAG_BOUNCE_COLLECTIBLES = true || FLAG_ALL_ON;
var FLAG_BOUNCE_DEAD = true || FLAG_ALL_ON;
var FLAG_ROUND_TILE_POSITIONS = false || FLAG_ALL_ON;
var FLAG_USE_VIEWY = false || FLAG_ALL_ON;
var FLAG_ANGLE_BULLETS = false;
var FLAG_SCALE_CANVAS = false;
var FLAG_FORSHADOW_COLLECTIBLES = true || FLAG_ALL_ON;
var FLAG_UNCAPPED_DEATH_SPEED = true || FLAG_ALL_ON;
var CHARS = FLAG_EMOJI_CHARACTERS ? [['⬛'], ['🔲'], ['😆'], ['💰'], ['🔥'], ['💧']] : '#?@$^*';
var CHAR_INDEX_WALL = 0;
var CHAR_INDEX_BREAKABLE_WALL = 0;
var CHAR_INDEX_SPECIAL_WALL = 1;
var CHAR_INDEX_PLAYER = 2;
var CHAR_INDEX_COLLECTIBLE = 3;
var CHAR_INDEX_OBSTACLE = 4;
var CHAR_INDEX_BULLET = 5;
var WALL_CHARACTER = FLAG_EMOJI_CHARACTERS ? '🔲' : '#';
var MAX_VY = FLAG_CHANGE_FONT ? 1 : .4;
var GRAVITY_DIV = FLAG_CHANGE_FONT ? 444 : 1e3;
var PLAYER_VELOCITY_DIV = FLAG_CHANGE_FONT ? 3 : FLAG_EMOJI_CHARACTERS ? 8 : 9;
var SHOOT_VELOCITY = FLAG_CHANGE_FONT ? -.2 : -.1;
var SCREEN_WIDTH = FLAG_CHANGE_FONT ? 444 : FLAG_EMOJI_CHARACTERS ? 96 : 90;
var HALF_SCREEN_WIDTH = FLAG_CHANGE_FONT || FLAG_EMOJI_CHARACTERS ? SCREEN_WIDTH / 2 : 45;
var SCREEN_HEIGHT = FLAG_CHANGE_FONT ? 644 : 145;
var HALF_SCREEN_HEIGHT = FLAG_CHANGE_FONT ? SCREEN_HEIGHT / 2 : 50;
var BIG_NUM = FLAG_CHANGE_FONT ? SCREEN_HEIGHT : FLAG_EMOJI_CHARACTERS ? 996 : 1e3;
var TILE_HEIGHT = FLAG_CHANGE_FONT ? 44 : FLAG_EMOJI_CHARACTERS ? 12 : 9;
var HALF_TILE_HEIGHT = FLAG_CHANGE_FONT || FLAG_EMOJI_CHARACTERS ? TILE_HEIGHT / 2 : 4;
var MAX_DIFF = FLAG_SCALE_PERFORMANCE ? TILE_HEIGHT : 16;
var SHOOT_COOLDOWN = FLAG_CHANGE_FONT ? 144 : SCREEN_HEIGHT;
var BULLET_VELOCITY = MAX_VY;
var JUMP_VELOCITY = FLAG_CHANGE_FONT ? -.7 : FLAG_EMOJI_CHARACTERS ? -.2 : -.2;
var FLOOR_PROBABILITY = .2;
var CANVAS_SCALE = FLAG_SCALE_CANVAS ? 3 : 0;
var TYPE_BREAKABLE_WALL = 1;
var TYPE_PLAYER = 2;
var TYPE_OBSTACLE = 4;
var TYPE_COLLECTIBLE = 8;
var TYPE_BULLET = 16;
var TYPE_WALL = TYPE_PLAYER;
var EDGE_BOTTOM = 0;
var EDGE_SIDE = 1;
var EDGE_TOP = 2;
if (FLAG_CHANGE_FONT) {
    c.font = TILE_HEIGHT + "px monospace";
}
if (FLAG_CENTER_TEXT) {
    c.textAlign = 'center';
    c.textBaseline = 'middle';
}
if (FLAG_SCALE_CANVAS) {
    c.scale(CANVAS_SCALE, CANVAS_SCALE);
}
var INDEX_VX = 0;
var INDEX_VY = 1;
var INDEX_GRAVITY_MULTIPLIER = 2;
var INDEX_TYPE = 3;
var INDEX_COLLISION_MASK = 4;
var INDEX_CY = 5;
var INDEX_CHARACTER = 6;
var INDEX_CX = 7;
var INDEX_WIDTH = 8;
var INDEX_DEAD = FLAG_MEASURE_ENTITY_WIDTH ? 9 : 8;
var INDEX_ROTATION = FLAG_MEASURE_ENTITY_WIDTH ? 10 : 9;
var INDEX_ROTATION_VELOCITY = FLAG_MEASURE_ENTITY_WIDTH ? 11 : 10;
var previousTime, miny, maxy, viewy, previousRowPopulated, TILE_WIDTH, HALF_TILE_WIDTH, minVerticalCount, minVerticalTime, minVerticalEntity, minVerticalEdge, minHorizontalCount, minHorizontalTime, minHorizontalEntity, f, collisionHandler, entityCount, count, minTime, shootTime, lastSurfaceTime, entity, compare, minEdge, shotsRemaining, j, w, h, maxShots, player;
previousTime = 0;
miny = 0;
maxy = 0;
shootTime = 0;
viewy = 0;
previousRowPopulated = 0;
lastSurfaceTime = 0;
entityCount = shotsRemaining = maxShots = 1;
if (FLAG_MEASURE_TILE_WIDTH) {
    TILE_WIDTH = c.measureText(WALL_CHARACTER).width;
    HALF_TILE_WIDTH = TILE_WIDTH / 2;
}
else {
    TILE_WIDTH = TILE_HEIGHT;
    HALF_TILE_WIDTH = HALF_TILE_HEIGHT;
}
if (FLAG_AGGREGATE_KEY_LISTENERS) {
    onkeydown = onkeyup = function (e) {
        a[e.key] = e.type[5] ? 1 : 0;
    };
}
else {
    onkeydown = function (e) {
        a[e.key] = 1;
    };
    onkeyup = function (e) {
        a[e.key] = 0;
    };
}
var entities = [player = [
        0,
        0,
        1,
        TYPE_PLAYER,
        TYPE_BREAKABLE_WALL | TYPE_COLLECTIBLE,
        HALF_SCREEN_HEIGHT,
        CHAR_INDEX_PLAYER,
        HALF_SCREEN_WIDTH,
    ]];
collisionHandler = function () {
    if (!(compare[INDEX_TYPE] & TYPE_COLLECTIBLE)) {
        if (minEdge % 2) {
            entity[INDEX_CX] -= minTime * entity[INDEX_VX];
            entity[INDEX_VX] = 0;
        }
        else {
            entity[INDEX_CY] -= minTime * entity[INDEX_VY];
            entity[INDEX_VY] = 0;
            if (!minEdge && entity[INDEX_TYPE] & TYPE_PLAYER) {
                lastSurfaceTime = previousTime;
            }
        }
    }
    entity[INDEX_DEAD] =
        (entity[INDEX_TYPE] & TYPE_BULLET)
            || (entity[INDEX_TYPE] & TYPE_COLLECTIBLE && compare[INDEX_TYPE] & (TYPE_PLAYER | TYPE_OBSTACLE));
    if (entity[INDEX_TYPE] & TYPE_COLLECTIBLE && compare[INDEX_TYPE] & TYPE_PLAYER && FLAG_UPGRADE) {
        maxShots++;
    }
    if (entity[INDEX_TYPE] & TYPE_BREAKABLE_WALL && (compare[INDEX_TYPE] & TYPE_BULLET)
        || entity[INDEX_TYPE] & (TYPE_PLAYER | TYPE_OBSTACLE) && compare[INDEX_TYPE] & TYPE_OBSTACLE
        || entity[INDEX_TYPE] & TYPE_BREAKABLE_WALL && (compare[INDEX_TYPE] & TYPE_PLAYER) && minEdge & EDGE_TOP && FLAG_HEADBUTT) {
        if (FLAG_BOUNCE_DEAD) {
            entity.splice(INDEX_VY, 4, JUMP_VELOCITY, 2, 0, 0);
        }
        else {
            entity.splice(INDEX_GRAVITY_MULTIPLIER, 3, 2, 0, 0);
        }
        if (FLAG_ALLOW_ROTATION) {
            entity[INDEX_ROTATION_VELOCITY] = entity[INDEX_VX] = (entity[INDEX_CX] - compare[INDEX_CX]) / TILE_WIDTH;
        }
        if (((!FLAG_FORSHADOW_COLLECTIBLES && Math.random() < .1) || (FLAG_FORSHADOW_COLLECTIBLES && entity[INDEX_CHARACTER])) && FLAG_COLLECTIBLES) {
            entities[entityCount++] = [
                0,
                FLAG_BOUNCE_COLLECTIBLES ? JUMP_VELOCITY : 0,
                1,
                TYPE_COLLECTIBLE,
                TYPE_BREAKABLE_WALL | TYPE_OBSTACLE,
                entity[INDEX_CY],
                CHAR_INDEX_COLLECTIBLE,
                entity[INDEX_CX],
            ];
        }
    }
};
f = function (time) {
    var diff;
    if (FLAG_REQUEST_ANIMATION_FRAME) {
        diff = FLAG_USE_MAX_DIFF ?
            Math.min(MAX_DIFF, time - previousTime) :
            time - previousTime;
        previousTime = time;
    }
    else {
        diff = MAX_DIFF;
        previousTime += diff;
    }
    entity = player;
    if (entity[INDEX_TYPE]) {
        if (FLAG_SMOOTH_SCROLL) {
            miny = entity[INDEX_CY] - SCREEN_HEIGHT;
            var targetScreenY = Math.max(miny, entity[INDEX_CY] - SCREEN_HEIGHT / 3);
            viewy += (targetScreenY - viewy) * diff / MAX_DIFF;
        }
        else {
            if (FLAG_USE_VIEWY) {
                viewy = miny = entity[INDEX_CY] - HALF_SCREEN_HEIGHT;
            }
            else {
                if (entity[INDEX_CY] - HALF_SCREEN_HEIGHT > miny) {
                    miny = entity[INDEX_CY] - HALF_SCREEN_HEIGHT;
                }
            }
        }
    }
    for (; maxy < (FLAG_USE_VIEWY ? viewy : miny) + SCREEN_HEIGHT;) {
        entities[entityCount++] = [
            0,
            0,
            0,
            TYPE_BREAKABLE_WALL,
            0,
            maxy,
            CHAR_INDEX_WALL,
            0,
        ];
        entities[entityCount++] = [
            0,
            0,
            0,
            TYPE_BREAKABLE_WALL,
            0,
            maxy,
            CHAR_INDEX_WALL,
            SCREEN_WIDTH - TILE_WIDTH,
        ];
        if (minVerticalTime = (maxy % TILE_HEIGHT < 1) & (maxy > SCREEN_HEIGHT) & (Math.random() > FLOOR_PROBABILITY)) {
            var k = SCREEN_WIDTH / TILE_WIDTH - 1;
            count = Math.random() * k | 0;
            if (FLAG_ROUND_TILE_POSITIONS) {
                minTime = (Math.random() * (k - count) | 0) * TILE_WIDTH;
            }
            else {
                minTime = Math.random() * (k - 1 - count) * TILE_WIDTH;
            }
            if (count & 2 && FLAG_MEASURE_TILE_WIDTH) {
                minTime = SCREEN_WIDTH - minTime - count * TILE_WIDTH - TILE_WIDTH;
            }
            for (; count; --count) {
                minTime += TILE_WIDTH;
                entities[entityCount++] = [
                    0,
                    0,
                    0,
                    TYPE_BREAKABLE_WALL,
                    0,
                    maxy,
                    FLAG_FORSHADOW_COLLECTIBLES ? Math.random() * 1.1 | 0 : CHAR_INDEX_WALL,
                    minTime,
                ];
                var p = FLAG_CHANGE_FONT ? 99 * TILE_HEIGHT : 1e3;
                if (!previousRowPopulated & (maxy / p > Math.random()) && FLAG_OBSTACLES) {
                    entities[entityCount++] = [
                        0,
                        0,
                        1,
                        TYPE_OBSTACLE,
                        TYPE_BREAKABLE_WALL | TYPE_PLAYER | TYPE_OBSTACLE,
                        maxy - TILE_HEIGHT,
                        CHAR_INDEX_OBSTACLE,
                        minTime,
                    ];
                }
            }
        }
        previousRowPopulated = minVerticalTime;
        maxy += TILE_HEIGHT;
    }
    if (FLAG_ALLOW_ROTATION) {
        c.setTransform(1, 0, 0, 1, 0, 0);
    }
    c.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    for (count = entityCount; count;) {
        var ok = entity = entities[--count];
        if (FLAG_MEASURE_ENTITY_WIDTH && (!entity[INDEX_WIDTH] || FLAG_ALWAY_CHECK_WIDTH)) {
            entity[INDEX_WIDTH] = c.measureText(CHARS[entity[INDEX_CHARACTER]]).width;
        }
        entity[INDEX_VY] += entity[INDEX_GRAVITY_MULTIPLIER] * diff / GRAVITY_DIV;
        if ((entity[INDEX_VY] > MAX_VY) & (!FLAG_UNCAPPED_DEATH_SPEED || entity[INDEX_TYPE])) {
            entity[INDEX_VY] = MAX_VY;
        }
        entity[INDEX_CX] += entity[INDEX_VX] * diff;
        entity[INDEX_CY] += entity[INDEX_VY] * diff;
        if (FLAG_ALLOW_ROTATION) {
            entity[INDEX_ROTATION] = (entity[INDEX_ROTATION] || 0) + (entity[INDEX_ROTATION_VELOCITY] || 0) * diff;
        }
        for (; ok;) {
            minHorizontalTime = minVerticalTime = BIG_NUM;
            minHorizontalCount = minVerticalCount = 0;
            minHorizontalEntity = minVerticalEntity = 0;
            for (j = entityCount; j > count;) {
                compare = entities[--j];
                minTime = FLAG_MEASURE_ENTITY_WIDTH ?
                    entity[INDEX_CX] + entity[INDEX_WIDTH] / 2 - compare[INDEX_CX] - compare[INDEX_WIDTH] / 2 :
                    entity[INDEX_CX] - compare[INDEX_CX];
                minEdge = entity[INDEX_CY] - compare[INDEX_CY];
                w = FLAG_MEASURE_ENTITY_WIDTH ?
                    (entity[INDEX_WIDTH] + compare[INDEX_WIDTH]) / 2 :
                    TILE_WIDTH;
                h = TILE_HEIGHT;
                if ((Math.abs(minTime) < w) & (Math.abs(minEdge) < h)
                    & !compare[INDEX_DEAD] & !entity[INDEX_DEAD]
                    && ((compare[INDEX_TYPE] & entity[INDEX_COLLISION_MASK]) | (entity[INDEX_TYPE] & compare[INDEX_COLLISION_MASK]))) {
                    if ((entity[INDEX_VX] > compare[INDEX_VX]) & (minTime <= 0) | (entity[INDEX_VX] < compare[INDEX_VX]) & (minTime >= 0)) {
                        minTime = (w - Math.abs(minTime)) / Math.abs(entity[INDEX_VX] - compare[INDEX_VX]);
                        minHorizontalCount++;
                        if (minTime < minHorizontalTime) {
                            minHorizontalTime = minTime;
                            minHorizontalEntity = compare;
                        }
                    }
                    if ((entity[INDEX_VY] > compare[INDEX_VY]) & (minEdge <= 0) | (entity[INDEX_VY] < compare[INDEX_VY]) & (minEdge >= 0)) {
                        minTime = (h - Math.abs(minEdge)) / Math.abs(entity[INDEX_VY] - compare[INDEX_VY]);
                        minVerticalCount++;
                        if (minTime < minVerticalTime) {
                            minVerticalTime = minTime;
                            minVerticalEntity = compare;
                            if (entity[INDEX_VY] > compare[INDEX_VY]) {
                                minVerticalEdge = EDGE_BOTTOM;
                            }
                            else {
                                minVerticalEdge = EDGE_TOP;
                            }
                        }
                    }
                }
            }
            if (ok = (minVerticalCount | minHorizontalCount)) {
                if ((minVerticalCount > minHorizontalCount) || (minVerticalCount == minHorizontalCount) && (minVerticalTime < minHorizontalTime)) {
                    minTime = minVerticalTime;
                    minEdge = minVerticalEdge;
                    compare = minVerticalEntity;
                }
                else {
                    minTime = minHorizontalTime;
                    minEdge = EDGE_SIDE;
                    compare = minHorizontalEntity;
                }
                collisionHandler();
                minHorizontalEntity = entity;
                entity = compare;
                compare = minHorizontalEntity;
                collisionHandler();
                entity = minHorizontalEntity;
            }
        }
        ;
        var tx = FLAG_CENTER_TEXT ?
            entity[INDEX_CX] + (FLAG_MEASURE_ENTITY_WIDTH ? entity[INDEX_WIDTH] / 2 : HALF_TILE_WIDTH) :
            entity[INDEX_CX];
        var ty = FLAG_CENTER_TEXT ?
            entity[INDEX_CY] + HALF_TILE_HEIGHT - (FLAG_USE_VIEWY ? viewy : miny) :
            entity[INDEX_CY] - (FLAG_USE_VIEWY ? viewy : miny);
        if (FLAG_ALLOW_ROTATION) {
            var sin = Math.sin(entity[INDEX_ROTATION]);
            var cos = Math.cos(entity[INDEX_ROTATION]);
            c.setTransform(cos, sin, -sin, cos, tx, ty);
        }
        if (FLAG_DEBUG_RENDER) {
            c.fillStyle = 'red';
            c.fillRect(FLAG_MEASURE_ENTITY_WIDTH ? entity[INDEX_WIDTH] / 2 : HALF_TILE_WIDTH, -HALF_TILE_HEIGHT, FLAG_MEASURE_ENTITY_WIDTH ? entity[INDEX_WIDTH] : TILE_WIDTH, TILE_HEIGHT);
            c.fillStyle = 'black';
        }
        if (FLAG_ALLOW_ROTATION) {
            c.fillText(CHARS[entity[INDEX_CHARACTER]], 0, 0);
        }
        else {
            c.fillText(CHARS[entity[INDEX_CHARACTER]], tx, ty);
        }
        if ((entity[INDEX_CY] < miny) | (entity[INDEX_CY] > maxy) | entity[INDEX_DEAD]) {
            entities.splice(count, 1);
            entityCount--;
        }
    }
    entity = player;
    if (entity[INDEX_TYPE]) {
        entity[INDEX_VX] = (a['d'] | 0 - a['a'] | 0) / PLAYER_VELOCITY_DIV;
        if (a['l']) {
            if (shootTime + SHOOT_COOLDOWN < previousTime) {
                shootTime = previousTime;
                if (lastSurfaceTime >= previousTime) {
                    entity[INDEX_VY] = JUMP_VELOCITY;
                    shotsRemaining = maxShots;
                }
                else if (shotsRemaining) {
                    shotsRemaining--;
                    if (FLAG_NICE_JUMPS) {
                        entity[INDEX_VY] = Math.min(SHOOT_VELOCITY, entity[INDEX_VY]);
                    }
                    else {
                        entity[INDEX_VY] = SHOOT_VELOCITY;
                    }
                    entities[entityCount++] = [
                        FLAG_ANGLE_BULLETS ? entity[INDEX_VX] : 0,
                        BULLET_VELOCITY,
                        0,
                        TYPE_BULLET,
                        TYPE_BREAKABLE_WALL,
                        entity[INDEX_CY],
                        CHAR_INDEX_BULLET,
                        entity[INDEX_CX],
                    ];
                }
            }
        }
    }
    if (FLAG_REQUEST_ANIMATION_FRAME) {
        requestAnimationFrame(f);
    }
};
if (FLAG_REQUEST_ANIMATION_FRAME) {
    f(0);
}
else {
    setInterval(f, MAX_DIFF);
}


/***/ })
/******/ ]);
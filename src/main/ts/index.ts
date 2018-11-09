const FLAG_ALL_ON = true;

const FLAG_REQUEST_ANIMATION_FRAME = false || FLAG_ALL_ON;
const FLAG_DEBUG_RENDER = false;
const FLAG_CENTER_TEXT = false || FLAG_ALL_ON;
const FLAG_EMOJI_CHARACTERS = false || FLAG_ALL_ON;
const FLAG_COLLECTIBLES = true || FLAG_ALL_ON;
const FLAG_OBSTACLES = true || FLAG_ALL_ON;
const FLAG_ALLOW_ROTATION = false || FLAG_ALL_ON;
const FLAG_CHANGE_FONT = false || FLAG_ALL_ON;
const FLAG_USE_MAX_DIFF = true && FLAG_REQUEST_ANIMATION_FRAME || FLAG_ALL_ON;
const FLAG_SMOOTH_SCROLL = false || FLAG_ALL_ON;
const FLAG_ALWAY_CHECK_WIDTH = false;
const FLAG_MEASURE_TILE_WIDTH = false || FLAG_ALL_ON;
const FLAG_MEASURE_ENTITY_WIDTH = false || FLAG_ALL_ON;
const FLAG_NICE_JUMPS = false || FLAG_ALL_ON;
const FLAG_AGGREGATE_KEY_LISTENERS = false;
const FLAG_SCALE_PERFORMANCE = false || FLAG_ALL_ON;
const FLAG_HEADBUTT = true || FLAG_ALL_ON;
const FLAG_UPGRADE = true || FLAG_ALL_ON;
const FLAG_BOUNCE_COLLECTIBLES = true || FLAG_ALL_ON;
const FLAG_BOUNCE_DEAD = true || FLAG_ALL_ON;
const FLAG_ROUND_TILE_POSITIONS = false || FLAG_ALL_ON; // saves 3 bytes
const FLAG_USE_VIEWY = false || FLAG_ALL_ON;
const FLAG_ANGLE_BULLETS = false;
const FLAG_SCALE_CANVAS = false;
const FLAG_FORSHADOW_COLLECTIBLES = true || FLAG_ALL_ON;
const FLAG_UNCAPPED_DEATH_SPEED = true || FLAG_ALL_ON;

const CHARS: any = FLAG_EMOJI_CHARACTERS?[['⬛'],['🔲'],['😆'],['💰'],['🔥'],['💧']]:'#?@$^*';

const CHAR_INDEX_WALL = 0;
const CHAR_INDEX_BREAKABLE_WALL = 0;
const CHAR_INDEX_SPECIAL_WALL = 1;
const CHAR_INDEX_PLAYER = 2;
const CHAR_INDEX_COLLECTIBLE = 3;
const CHAR_INDEX_OBSTACLE = 4;
const CHAR_INDEX_BULLET = 5;

const WALL_CHARACTER = FLAG_EMOJI_CHARACTERS?'🔲':'#';
const MAX_VY = FLAG_CHANGE_FONT?1:.4;
//const GRAVITY = FLAG_CHANGE_FONT?.002:.001;
const GRAVITY_DIV = FLAG_CHANGE_FONT?444:1e3
//const PLAYER_VELOCITY = FLAG_CHANGE_FONT?.3:.1;
const PLAYER_VELOCITY_DIV = FLAG_CHANGE_FONT?3:FLAG_EMOJI_CHARACTERS?8:9;
const SHOOT_VELOCITY = FLAG_CHANGE_FONT?-.2:-.1;
const SCREEN_WIDTH = FLAG_CHANGE_FONT?444:FLAG_EMOJI_CHARACTERS?96:90;
const HALF_SCREEN_WIDTH = FLAG_CHANGE_FONT||FLAG_EMOJI_CHARACTERS?SCREEN_WIDTH/2:45;
const SCREEN_HEIGHT = FLAG_CHANGE_FONT?644:145;
const HALF_SCREEN_HEIGHT = FLAG_CHANGE_FONT?SCREEN_HEIGHT/2:50;
const BIG_NUM = FLAG_CHANGE_FONT?SCREEN_HEIGHT:FLAG_EMOJI_CHARACTERS?996:1e3;
const TILE_HEIGHT = FLAG_CHANGE_FONT?44:FLAG_EMOJI_CHARACTERS?12:9;
const HALF_TILE_HEIGHT = FLAG_CHANGE_FONT||FLAG_EMOJI_CHARACTERS?TILE_HEIGHT/2:4;
const MAX_DIFF = FLAG_SCALE_PERFORMANCE?TILE_HEIGHT:16;
const SHOOT_COOLDOWN = FLAG_CHANGE_FONT?144:SCREEN_HEIGHT;
const BULLET_VELOCITY = MAX_VY;
const JUMP_VELOCITY = FLAG_CHANGE_FONT?-.7:FLAG_EMOJI_CHARACTERS?-.2:-.2;
const FLOOR_PROBABILITY = .2;
const CANVAS_SCALE = FLAG_SCALE_CANVAS?3:0;


const TYPE_BREAKABLE_WALL = 1;
const TYPE_PLAYER = 2;
const TYPE_OBSTACLE = 4;
const TYPE_COLLECTIBLE = 8;
const TYPE_BULLET = 16;
const TYPE_WALL = TYPE_PLAYER;
// const TYPE_MONSTER_FLYING = 64;
// const TYPE_MONSTER_LAND = 128;

const EDGE_BOTTOM = 0;
const EDGE_SIDE = 1;
const EDGE_TOP = 2;

if( FLAG_CHANGE_FONT ) {
    c.font = `${TILE_HEIGHT}px monospace`;
}
if( FLAG_CENTER_TEXT ) {
    c.textAlign = 'center';
    c.textBaseline = 'middle';
}
if( FLAG_SCALE_CANVAS ) {
    c.scale(CANVAS_SCALE, CANVAS_SCALE);
}

type Entity = number[];

const INDEX_VX = 0;
const INDEX_VY = 1;
const INDEX_GRAVITY_MULTIPLIER = 2;
const INDEX_TYPE = 3;
const INDEX_COLLISION_MASK = 4;
const INDEX_CY = 5;
const INDEX_CHARACTER = 6;
const INDEX_CX = 7;
const INDEX_WIDTH = 8;
const INDEX_DEAD = FLAG_MEASURE_ENTITY_WIDTH?9:8;
const INDEX_ROTATION = FLAG_MEASURE_ENTITY_WIDTH?10:9;
const INDEX_ROTATION_VELOCITY = FLAG_MEASURE_ENTITY_WIDTH?11:10;
//const INDEX_HEIGHT = 11;

/*
interface Entity {
    cx: number; 
    cy: number;
    r?: number;
    w?: number; 
    h?: number;
    ch: string; 
    vx?: number; 
    vy?: number;
    vr?: number;
    gravityMultiplier: number;
    typeFlag: number;
    collisionMask: number;
    dead?: any;
    lastSurfaceTime?: number;
}
*/

let previousTime: number, 
    miny: number, 
    maxy: number, 
    viewy: number, 
    previousRowPopulated: boolean, 
    TILE_WIDTH: number,
    HALF_TILE_WIDTH: number,
    minVerticalCount: number,
    minVerticalTime: number,
    minVerticalEntity: Entity,
    minVerticalEdge: number,
    minHorizontalCount: number,
    minHorizontalTime: number,
    minHorizontalEntity: Entity, 
    f: (t: number) => void, 
    collisionHandler: () => void, 
    entityCount: number, 
    count: number,
    minTime: number, 
    shootTime: number, 
    lastSurfaceTime: number, 
    entity: Entity,
    compare: Entity,
    minEdge: number,
    shotsRemaining: number, 
    j: number, 
    w: number, 
    h: number, 
    maxShots: number, 
    player: Entity
    ;


previousTime = 0;
miny = 0;
maxy = 0;
shootTime = 0;
viewy = 0;
previousRowPopulated = <any>0;
lastSurfaceTime = 0;
entityCount = shotsRemaining = maxShots = 1;
if( FLAG_MEASURE_TILE_WIDTH ) {
    TILE_WIDTH = c.measureText(WALL_CHARACTER).width;
    HALF_TILE_WIDTH = TILE_WIDTH/2;
} else {
    TILE_WIDTH = TILE_HEIGHT;
    HALF_TILE_WIDTH = HALF_TILE_HEIGHT;
}
if( FLAG_AGGREGATE_KEY_LISTENERS ) {
    onkeydown = onkeyup = (e: KeyboardEvent) => {
        // keyu[p]
        // keyd[o]wn
        a[e.key] = e.type[5]?1:0;
    }
    
} else {
    onkeydown = (e: KeyboardEvent) => {
        a[e.key] = 1;
    }

    onkeyup = (e: KeyboardEvent) => {
        a[e.key] = 0;
    }
}

let entities: Entity[] = [player = [
    0, //vx
    0, //vy
    1, // gravity multiplier
    TYPE_PLAYER, // type
    TYPE_BREAKABLE_WALL | TYPE_COLLECTIBLE,// | TYPE_MONSTER_FLYING | TYPE_MONSTER_LAND, // collision mask
    HALF_SCREEN_HEIGHT, //cy
    CHAR_INDEX_PLAYER, // character
    HALF_SCREEN_WIDTH, // cx
]];



collisionHandler = function() {
    if( !(compare[INDEX_TYPE] & TYPE_COLLECTIBLE) ) {
        if( minEdge % 2 ) {
            entity[INDEX_CX] -= minTime * entity[INDEX_VX];
            entity[INDEX_VX] = 0;
        } else {
            entity[INDEX_CY] -= minTime * entity[INDEX_VY];
            entity[INDEX_VY] = 0;
            // BOTTOM
            if( !minEdge && entity[INDEX_TYPE] & TYPE_PLAYER)  {
                lastSurfaceTime = previousTime;
            }
        }
    }
    entity[INDEX_DEAD] = 
        (entity[INDEX_TYPE] & TYPE_BULLET) 
        || (entity[INDEX_TYPE] & TYPE_COLLECTIBLE && compare[INDEX_TYPE] & (TYPE_PLAYER|TYPE_OBSTACLE));

    if( entity[INDEX_TYPE] & TYPE_COLLECTIBLE && compare[INDEX_TYPE] & TYPE_PLAYER && FLAG_UPGRADE ) {
        maxShots++;        
    }

    if( 
        entity[INDEX_TYPE] & TYPE_BREAKABLE_WALL && (compare[INDEX_TYPE] & TYPE_BULLET)
        || entity[INDEX_TYPE] & (TYPE_PLAYER|TYPE_OBSTACLE) && compare[INDEX_TYPE] & TYPE_OBSTACLE
        || entity[INDEX_TYPE] & TYPE_BREAKABLE_WALL && (compare[INDEX_TYPE] & TYPE_PLAYER) && minEdge&EDGE_TOP && FLAG_HEADBUTT
    ) {
        if( FLAG_BOUNCE_DEAD ) {
            entity.splice(INDEX_VY, 4, JUMP_VELOCITY, 2, 0, 0);
        } else {
            entity.splice(INDEX_GRAVITY_MULTIPLIER, 3, 2, 0, 0);
        }
        //entity.splice(INDEX_VX, 5, 0, 0, 2, 0, 0);
        //entity[INDEX_GRAVITY_MULTIPLIER] = 2;
        //entity[INDEX_TYPE] = entity[INDEX_COLLISION_MASK] = 0;
        //let r = Math.random();
        if( FLAG_ALLOW_ROTATION ) {
            entity[INDEX_ROTATION_VELOCITY] = entity[INDEX_VX] = (entity[INDEX_CX] - compare[INDEX_CX])/TILE_WIDTH;
        }
        if( ((!FLAG_FORSHADOW_COLLECTIBLES && Math.random()<.1) || (FLAG_FORSHADOW_COLLECTIBLES && entity[INDEX_CHARACTER])) && FLAG_COLLECTIBLES ) {
            entities[entityCount++] = [
                0, //vx
                FLAG_BOUNCE_COLLECTIBLES?JUMP_VELOCITY:0, //vy: 
                1,  // gravityMultiplier: 
                TYPE_COLLECTIBLE, //typeFlag: 
                TYPE_BREAKABLE_WALL | TYPE_OBSTACLE, //collisionMask: 
                entity[INDEX_CY], //cy: 
                CHAR_INDEX_COLLECTIBLE, // ch
                entity[INDEX_CX], //cx: 
            ];    
        }
    }
};

f = function(time: number){
    let diff: number;
    if( FLAG_REQUEST_ANIMATION_FRAME ) {
        diff = FLAG_USE_MAX_DIFF ?
            Math.min(MAX_DIFF, time - previousTime) :
            time - previousTime;
        previousTime = time;
    } else {
        diff = MAX_DIFF;
        previousTime += diff;
    }

    entity = player;
    if( entity[INDEX_TYPE] ) {
        if( FLAG_SMOOTH_SCROLL ) {
            miny = entity[INDEX_CY] - SCREEN_HEIGHT;
            let targetScreenY = Math.max(miny, entity[INDEX_CY] - SCREEN_HEIGHT/3);
            viewy += (targetScreenY - viewy)*diff/MAX_DIFF;    
        } else {
            if(FLAG_USE_VIEWY ) {
                viewy = miny = entity[INDEX_CY] - HALF_SCREEN_HEIGHT;
            } else {
                if( entity[INDEX_CY] - HALF_SCREEN_HEIGHT > miny ) {
                    miny = entity[INDEX_CY] - HALF_SCREEN_HEIGHT;
                }
            }
        }
    
    }

    // fill in world
    for(;maxy < (FLAG_USE_VIEWY?viewy:miny) + SCREEN_HEIGHT;) {        
        entities[entityCount++] = [
            0, //vx, 
            0, //vy
            0, //gravityMultiplier: 
            TYPE_BREAKABLE_WALL, //typeFlag: 
            0, //collisionMask:                     
            maxy, //cy: 
            CHAR_INDEX_WALL, //ch: 
            0, //cx: 
        ];
        entities[entityCount++] = [
            0, //vx
            0, //vy
            0, //gravityMultiplier: 
            TYPE_BREAKABLE_WALL, //typeFlag: 
            0, //collisionMask: 
            maxy, //cy: 
            CHAR_INDEX_WALL, //ch: 
            SCREEN_WIDTH - TILE_WIDTH, //cx: 
        ];
        
        if( minVerticalTime = <any>(maxy % TILE_HEIGHT<1) & <any>(maxy > SCREEN_HEIGHT) & <any>(Math.random() > FLOOR_PROBABILITY) ) {
            // put in a platform
            let k = SCREEN_WIDTH / TILE_WIDTH - 1;
            //w = n * k;
            count = Math.random() * k | 0;
            if( FLAG_ROUND_TILE_POSITIONS ) {
                minTime = (Math.random() * (k - count) | 0) * TILE_WIDTH;
            } else {
                minTime = Math.random() * (k - 1 - count) * TILE_WIDTH;
            }
            //let x = TILE_WIDTH/2;
            if( count & 2 && FLAG_MEASURE_TILE_WIDTH ) {
                minTime = SCREEN_WIDTH - minTime - count * TILE_WIDTH - TILE_WIDTH;
            }
            //x = SCREEN_WIDTH/2;
            for( ;count; --count) {
                minTime += TILE_WIDTH;
                entities[entityCount++] = [
                    0, //vx
                    0, //vy
                    0, //gravityMultiplier: 
                    TYPE_BREAKABLE_WALL, //typeFlag: 
                    0, //collisionMask: 
                    maxy, //cy: 
                    FLAG_FORSHADOW_COLLECTIBLES?Math.random()*1.1|0:CHAR_INDEX_WALL, //ch: 
                    minTime, //cx: 
                ];
                let p = FLAG_CHANGE_FONT?99*TILE_HEIGHT:1e3;
                if( <any>!previousRowPopulated & <any>(maxy/p > Math.random()) && FLAG_OBSTACLES ) {
                    // maybe add in a monster or something
                    entities[entityCount++] = [
                        0, //vx
                        0, //vy
                        1, //gravityMultiplier: 
                        TYPE_OBSTACLE, //typeFlag: 
                        TYPE_BREAKABLE_WALL | TYPE_PLAYER | TYPE_OBSTACLE, //collisionMask: 
                        maxy - TILE_HEIGHT, //cy: 
                        CHAR_INDEX_OBSTACLE, //ch: 
                        minTime, //cx: 
                    ];
                }
            }
        }
        previousRowPopulated = <any>minVerticalTime;

        maxy += TILE_HEIGHT;
    }

    if( FLAG_ALLOW_ROTATION ) {
        c.setTransform(1, 0, 0, 1, 0, 0);
    }
    c.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    for( count=entityCount; count; ){
        let ok = entity = entities[--count];
        // note order is important here (must be checked in index order)
        // if( !entity[INDEX_VY] ) {
        //     entity[INDEX_VY] = 0;
        // }
        // if( !entity[INDEX_VX] ) {
        //     entity[INDEX_VX] = 0;
        // }
        if( FLAG_MEASURE_ENTITY_WIDTH && (!entity[INDEX_WIDTH] || FLAG_ALWAY_CHECK_WIDTH) ) {
            //entity.splice(INDEX_WIDTH, 2, m.width, TILE_HEIGHT);
            entity[INDEX_WIDTH] = c.measureText(CHARS[entity[INDEX_CHARACTER]]).width;
        }
        // if( !entity[INDEX_ROTATION] && FLAG_ALLOW_ROTATION ) {
        //     entity[INDEX_ROTATION] = 0;
        // }
        // if( !entity[INDEX_ROTATION_VELOCITY] && FLAG_ALLOW_ROTATION ) {
        //     entity[INDEX_ROTATION_VELOCITY] = 0;
        // }
        entity[INDEX_VY] += entity[INDEX_GRAVITY_MULTIPLIER] * diff/GRAVITY_DIV;
        if( <any>(entity[INDEX_VY] > MAX_VY) & <any>(!FLAG_UNCAPPED_DEATH_SPEED || entity[INDEX_TYPE]) ) {
            entity[INDEX_VY] = MAX_VY;
        }


        entity[INDEX_CX] += entity[INDEX_VX] * diff;
        entity[INDEX_CY] += entity[INDEX_VY] * diff;
        if( FLAG_ALLOW_ROTATION ) {
            entity[INDEX_ROTATION] = (entity[INDEX_ROTATION]||0)+(entity[INDEX_ROTATION_VELOCITY]||0) * diff;
        }

        
        for(;ok;) {
            minHorizontalTime = minVerticalTime = BIG_NUM;
            minHorizontalCount = minVerticalCount = 0;
            minHorizontalEntity = minVerticalEntity = <any>0;

            for( j=entityCount; j>count;  ) { // should be count+1, but nothing can collide with itself, so it should be ok
            //for( j=count; j; ) {
                // check for collisions
                compare = entities[--j];
                // do they overlap?
                minTime = FLAG_MEASURE_ENTITY_WIDTH?
                    entity[INDEX_CX] + entity[INDEX_WIDTH]/2 - compare[INDEX_CX] - compare[INDEX_WIDTH]/2:
                    entity[INDEX_CX] - compare[INDEX_CX];
                minEdge = entity[INDEX_CY] - compare[INDEX_CY];
                w = FLAG_MEASURE_ENTITY_WIDTH?
                    (entity[INDEX_WIDTH] + compare[INDEX_WIDTH])/2:
                    TILE_WIDTH;
                h = TILE_HEIGHT;//(entity[INDEX_HEIGHT] + compare[INDEX_HEIGHT])/2;
                //let dvx = entity[INDEX_VX] - compare[INDEX_VX];
                //let dvy = entity[INDEX_VY] - compare[INDEX_VY];
                if( 
                    <any>(Math.abs(minTime) < w) & <any>(Math.abs(minEdge) < h) 
                    & <any>!compare[INDEX_DEAD] & <any>!entity[INDEX_DEAD]
                    && ((compare[INDEX_TYPE] & entity[INDEX_COLLISION_MASK]) | (entity[INDEX_TYPE] & compare[INDEX_COLLISION_MASK]))
                ) {

                    if( <any>(entity[INDEX_VX] > compare[INDEX_VX]) & <any>(minTime <= 0) | <any>(entity[INDEX_VX] < compare[INDEX_VX]) & <any>(minTime >= 0) ) {
                        minTime = (w - Math.abs(minTime)) / Math.abs(entity[INDEX_VX] - compare[INDEX_VX]);
                        minHorizontalCount++;
                        if( minTime < minHorizontalTime ) {
                            minHorizontalTime = minTime;
                            minHorizontalEntity = compare;
                        }    
                    }
                    if( <any>(entity[INDEX_VY] > compare[INDEX_VY]) & <any>(minEdge <= 0) | <any>(entity[INDEX_VY] < compare[INDEX_VY]) & <any>(minEdge >= 0) ) {
                        minTime = (h - Math.abs(minEdge)) / Math.abs(entity[INDEX_VY] - compare[INDEX_VY]);
                        minVerticalCount++;
                        if( minTime < minVerticalTime ) {
                            minVerticalTime = minTime;
                            minVerticalEntity = compare;
                            if( entity[INDEX_VY] > compare[INDEX_VY] ) {
                                minVerticalEdge = EDGE_BOTTOM;
                            } else {
                                minVerticalEdge = EDGE_TOP;
                            }    
                        }
                    }

                    /*
                    if( !xtime || xtime > ytime ) {
                        t = ytime;
                        if( dvy > 0 ) {
                            edge = EDGE_BOTTOM;
                        } else {
                            edge = EDGE_TOP;
                        }
                    } else if( xtime ) {
                        t = xtime;
                        edge = EDGE_SIDE;
                    }
                    */

                }
                
            }
            if( ok = <any>(minVerticalCount | minHorizontalCount) ) {
                if( <any>(minVerticalCount > minHorizontalCount) || <any>(minVerticalCount == minHorizontalCount) && <any>(minVerticalTime < minHorizontalTime) ) {
                    minTime = minVerticalTime;
                    minEdge = minVerticalEdge;
                    compare = minVerticalEntity;
                } else {
                    minTime = minHorizontalTime;
                    minEdge = EDGE_SIDE;
                    compare = minHorizontalEntity;
                }
                collisionHandler();
                minHorizontalEntity = entity;
                entity = compare;
                compare = minHorizontalEntity;
                // should be (minEdge+2)%4
                //minEdge-=2;
                collisionHandler();
                entity = minHorizontalEntity;
            }
    
        };

        // render
        let tx = FLAG_CENTER_TEXT?
            entity[INDEX_CX] + (FLAG_MEASURE_ENTITY_WIDTH?entity[INDEX_WIDTH]/2:HALF_TILE_WIDTH):
            entity[INDEX_CX];
        //let ty = FLAG_CENTER_TEXT?entity[INDEX_CY] - viewy:entity[INDEX_CY] - viewy + entity[INDEX_HEIGHT]/2;
        
        let ty = FLAG_CENTER_TEXT?
            entity[INDEX_CY] + HALF_TILE_HEIGHT - (FLAG_USE_VIEWY?viewy:miny):
            entity[INDEX_CY] - (FLAG_USE_VIEWY?viewy:miny);
        if( FLAG_ALLOW_ROTATION ) {
            let sin = Math.sin(entity[INDEX_ROTATION]);
            let cos = Math.cos(entity[INDEX_ROTATION]);
            // c.transform(1, 0, 0, 1, entity.cx, entity.cy - viewy);
            // c.transform(cos, sin, -sin, cos, 0, 0)
            c.setTransform(cos, sin, -sin, cos, tx, ty);
        }
        
        if( FLAG_DEBUG_RENDER ) {
            c.fillStyle = 'red';
            //c.fillRect(-entity[INDEX_WIDTH]/2, -entity[INDEX_HEIGHT]/2, entity[INDEX_WIDTH], entity[INDEX_HEIGHT]);
            c.fillRect(
                FLAG_MEASURE_ENTITY_WIDTH?entity[INDEX_WIDTH]/2:HALF_TILE_WIDTH, 
                -HALF_TILE_HEIGHT, 
                FLAG_MEASURE_ENTITY_WIDTH?entity[INDEX_WIDTH]:TILE_WIDTH, 
                TILE_HEIGHT
            );
            c.fillStyle = 'black';    
        }
        if( FLAG_ALLOW_ROTATION ) {
            c.fillText(CHARS[entity[INDEX_CHARACTER]], 0, 0);    
        } else {
            c.fillText(CHARS[entity[INDEX_CHARACTER]], tx, ty);
        }
        if( <any>(entity[INDEX_CY] < miny) | <any>(entity[INDEX_CY] > maxy) | <any>entity[INDEX_DEAD] ) {
            // remove it
            entities.splice(count, 1);
            entityCount--;
        }
        
    }

    /*if( entity[INDEX_TYPE] & TYPE_PLAYER )*/ 
    entity = player;
    if( entity[INDEX_TYPE] ){
        
        // do player stuff 
        entity[INDEX_VX] = (a['d']|0 - a['a']|0) / PLAYER_VELOCITY_DIV;
        //entity.vr = entity.vx/99;
        if( a['l'] ) {
            if( shootTime + SHOOT_COOLDOWN < previousTime ) {
                shootTime = previousTime;
                if( lastSurfaceTime >= previousTime ) {
                    entity[INDEX_VY] = JUMP_VELOCITY;
                    shotsRemaining = maxShots;
                } else if( shotsRemaining ) {
                    shotsRemaining--;
                    if( FLAG_NICE_JUMPS ) {
                        entity[INDEX_VY] = Math.min(SHOOT_VELOCITY, entity[INDEX_VY]);
                    } else {
                        entity[INDEX_VY] = SHOOT_VELOCITY;
                    }
                    entities[entityCount++] = [
                        FLAG_ANGLE_BULLETS?entity[INDEX_VX]:0, //vx
                        BULLET_VELOCITY, //vy: 
                        0, //gravityMultiplier: 
                        TYPE_BULLET, //typeFlag: 
                        TYPE_BREAKABLE_WALL, //| TYPE_BULLET, //collisionMask: (TYPE_BULLET not required, but gets our number here to 198)
                        entity[INDEX_CY], // cy:                 
                        CHAR_INDEX_BULLET, //ch: 
                        entity[INDEX_CX], //cx: 
                    ];
                }        
            } 
        }
        //player[INDEX_VY] = Math.min(MAX_VY, player[INDEX_VY]);
    }


    if( FLAG_REQUEST_ANIMATION_FRAME ) {
        requestAnimationFrame(f);
    }
}
if( FLAG_REQUEST_ANIMATION_FRAME ) {
    f(0);
} else {
    setInterval(f, MAX_DIFF);
}

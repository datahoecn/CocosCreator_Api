// 0 是 player
// 1 是 step
// 2 是 barrier
// 3 是 小怪的子弹
window.Global = {
   isPlay: null,
   firstLogin: false,
   language: "zh",
   level_num: 1,
   attack_json: null,
   hp_json: null,
   speed_json: null,
   text_json: null,
   total_gold: 0,
   speed_lv: 0,
   attack_lv: 0,
   life_lv: 0,
   isOver: false,
   design_width: 720,
   design_height: 1280,
   ground_y: -440, // 地面位置
   barrier_oriX: 410,
   player: null,
   barriers: null,
   Canvas: null,
   steps: null,
   bullets: null,
   aniMgr:null,
   monsters:null,
   top_y: 460, // 一个障碍物的高度
   player_x: -140, // 主公的位置

   // 子弹移动速度
   moveSpeed: 1000,

   // 障碍物移动速度
   move_x: 160,
   // 背景移动速度
   bg_move_x: 60,
   // 生成台阶间隔
   step_time: 0.2,
   // 小鸟下降速度
   decline_speed: 800
};


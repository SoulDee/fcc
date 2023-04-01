// 数据来源：一言 https://hitokoto.cn/#

import { randomInt } from "./utils";

const Quotes = [
  { "id": 7919, "from": "梦伴", "from_who": "梅艳芳", "hitokoto": "一切已失去，不可以再追。" },
  { "id": 6325, "from": "当你沉睡时", "from_who": null, "hitokoto": "自责要短暂，不过要长久铭记。" },
  { "id": 8590, "from": "樱花庄的宠物女孩", "from_who": "樱花庄的宠物女孩​", "hitokoto": "无聊的并不是时间，而是平庸无奇的我。" },
  { "id": 8830, "from": "铠甲勇士", "from_who": "路法", "hitokoto": "我要打倒最可怕的邪恶，难免要撕去虚假正义的薄薄糖衣。" },
  { "id": 5393, "from": "不痛", "from_who": "南语", "hitokoto": "祈愿万家灯火熨烫过脉络，刀山与火海多深刻，都陪你渡过。" },
  { "id": 8830, "from": "铠甲勇士", "from_who": "路法", "hitokoto": "我要打倒最可怕的邪恶，难免要撕去虚假正义的薄薄糖衣。" },
  { "id": 6739, "from": "卡萨布兰卡", "from_who": "迈克尔·柯蒂茲", "hitokoto": "你现在的气质里，藏着你走过的路，读过的书和爱过的人。" },
  { "id": 4906, "from": "天气预报员", "from_who": "天气预报员", "hitokoto": "成年人的世界没有容易二字。" },
  { "id": 8371, "from": "征服", "from_who": "华强", "hitokoto": "你是故意找茬是不是？" },
  { "id": 6104, "from": "万国志", "from_who": null, "hitokoto": "世事变幻无常，而近乎永恒不变者，唯你我头上的同一片星空。" },
  { "id": 5350, "from": "不痛", "from_who": "南语", "hitokoto": "谎话被歌颂，扮清醒的人作哑装聋。" },
  { "id": 8481, "from": "假面骑士decade", "from_who": "门矢士", "hitokoto": "我只是个路过的假面骑士。" },
  { "id": 4897, "from": "蝶恋花·阅尽天涯离别苦", "from_who": "王国维", "hitokoto": "最是人间留不住，朱颜辞镜花辞树。" },
  { "id": 8371, "from": "征服", "from_who": "华强", "hitokoto": "你是故意找茬是不是？" },
  { "id": 7309, "from": "网剧棋魂", "from_who": "方绪", "hitokoto": "就算是堕落浪子，也能力挽狂澜。" },
  { "id": 8310, "from": "青春杂货铺", "from_who": null, "hitokoto": "恋爱本质不是走向婚姻，而是探究最真实的自己。" },
  { "id": 5350, "from": "不痛", "from_who": "南语", "hitokoto": "谎话被歌颂，扮清醒的人作哑装聋。" },
  { "id": 6325, "from": "当你沉睡时", "from_who": null, "hitokoto": "自责要短暂，不过要长久铭记。" },
  { "id": 5111, "from": "你的答案", "from_who": "黄霄雲", "hitokoto": "迎着风，拥抱彩虹！" },
  { "id": 4897, "from": "蝶恋花·阅尽天涯离别苦", "from_who": "王国维", "hitokoto": "最是人间留不住，朱颜辞镜花辞树。" },
  { "id": 5901, "from": "鹧鸪天·元夕有所梦", "from_who": "姜夔", "hitokoto": "春未绿，鬓先丝。人间别久不成悲。" },
  { "id": 8051, "from": "蜘蛛侠：英雄无归", "from_who": "MJ", "hitokoto": "当你足够期待失望时，你就永远不会失望。" },
  { "id": 5559, "from": "卖花声·怀古", "from_who": "张可久", "hitokoto": "美人自刎乌江岸，战火曾烧赤壁山，将军空老玉门关。" },
  { "id": 764, "from": "肖申克的救赎", "from_who": null, "hitokoto": "Just give me that chance." },
  { "id": 6503, "from": "飞鸟集", "from_who": "泰戈尔", "hitokoto": "我们把世界看错，反说它欺骗了我们。" },
  { "id": 6668, "from": "jojo的奇妙冒险", "from_who": "空条徐伦", "hitokoto": "两个人从监狱的窗户往外看，一个看见了土地，一个看见了星星。" },
  { "id": 6971, "from": "滕王阁序", "from_who": "王勃", "hitokoto": "落霞与孤鹜齐飞，秋水共长天一色。" },
  { "id": 7352, "from": "辛德勒的名单", "from_who": "奥斯卡·辛德勒", "hitokoto": "Control is Power." },
  { "id": 4679, "from": "我爱这土地", "from_who": null, "hitokoto": "为什么我的眼里常含泪水？因为我对这土地爱的深沉。" },
  { "id": 4464, "from": "惊悚乐园", "from_who": null, "hitokoto": " 不合理的事物，未必都是显而易见的" },
]

export const randomQuote = () => {
  return Quotes[randomInt(0, Quotes.length - 1)];
};
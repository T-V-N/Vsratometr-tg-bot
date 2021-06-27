import { Context } from 'telegraf';
import { pipe, sort } from 'remeda'
import { Op } from 'sequelize';
import { subHours, format } from 'date-fns';;

import { ReplyPost } from '../models';


const convertLevel = (value: number) => {
  switch (value) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '  ' + value + '.';
  }
}

export const replyStats = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }


  const postList = await ReplyPost.findAll({
    where: {
      chatId,
      created: {
        [Op.gte]: subHours(new Date(), 48),
      },
    },
  });

  const top = pipe(
    postList,
    sort((a, b) => b.value - a.value),
    (x) => x.filter(({ value }) => value >= 3),
    (x) => x.filter((_, i) => i < 30),
    (x) => x.map(({ value, url, created }, i) => 
    `${convertLevel(i + 1)} score: ${value}, [сообщение ${format(created || new Date(), 'M-d H:m')}](${url})`),
    (x) => x.join('\n'),
  );


  ctx.reply(
    'Топ реплаев за последнии 48 часов:\n\n' +
    (top.length > 0 ? top : 'Пусто :(\n'),
    {parse_mode: 'Markdown'}
  );

}

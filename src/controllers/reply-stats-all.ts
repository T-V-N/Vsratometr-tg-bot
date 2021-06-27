import { Context } from 'telegraf';
import { pipe, sort } from 'remeda'
import { format } from 'date-fns';;

import { ReplyPost } from '../models';


const convertLevel = (value: number) => {
  switch (value) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '  ' + value + '.';
  }
}

export const replyStatsAll = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }


  const postList = await ReplyPost.findAll({
    where: {
      chatId,
    },
  });

  const top = pipe(
    postList,
    sort((a, b) => b.value - a.value),
    (x) => x.filter(({ value }) => value >= 5),
    (x) => x.filter((_, i) => i < 30),
    (x) => x.map(({ value, url, created }, i) => `${convertLevel(i + 1)} score: ${value}, [сообщение ${format(created || new Date(), 'M-d H:m')}](${url})`),
    (x) => x.join('\n'),
  );


  ctx.reply(
    'Топ реплаев за всё время:\n\n' +
    (top.length > 0 ? top : 'Пусто :(\n'),
    {parse_mode: 'Markdown'}
  );

}

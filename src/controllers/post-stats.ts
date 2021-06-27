import { Context } from 'telegraf';
import { pipe, sort } from 'remeda'
import { Op } from 'sequelize';
import { subHours, format } from 'date-fns';;

import { Post } from '../models';


const convertLevel = (value: number) => {
  switch (value) {
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '  ' + value + '.';
  }
}

export const postStats = async (ctx: Context) => {
  const chatId = ctx.chat?.id;
  if (!chatId) {
    return;
  }


  const postList = await Post.findAll({
    where: {
      chatId,
      created: {
        [Op.gte]: subHours(new Date(), 48),
      },
    },
  });

  const superTop = pipe(
    postList,
    sort((a, b) => (b.plus + b.minus) - (a.plus + a.minus)),
    (x) => x.filter(({ plus, minus }) => plus > 1 && minus > 1 && (plus + minus) > 3),
    (x) => x.filter((_, i) => i < 10),
    (x) => x.map(({ plus, minus, url, created }, i) => `${convertLevel(i + 1)} score: ${plus + minus}, [сообщение ${format(created || new Date(), 'M-d H:m')}](${url})`),
    (x) => x.join('\n'),
  );

  const top = pipe(
    postList,
    sort((a, b) => b.plus - a.plus),
    (x) => x.filter(({ plus }) => plus > 0),
    (x) => x.filter(({ plus }) => plus > 1),
    (x) => x.filter((_, i) => i < 10),
    (x) => x.map(({ plus, url, created }, i) => `${convertLevel(i + 1)} score: +${plus}, [сообщение ${format(created || new Date(), 'M-d H:m')}](${url})`),
    (x) => x.join('\n'),
  );

  const bottom = pipe(
    postList,
    sort((a, b) => b.minus - a.minus),
    (x) => x.filter(({ minus }) => minus > 0),
    (x) => x.filter(({ minus }) => minus > 1),
    (x) => x.filter((_, i) => i < 10),
    (x) => x.map(({ minus, url, created }, i) => `${convertLevel(i + 1)} score: -${minus}, [сообщение ${format(created || new Date(), 'M-d H:m')}](${url})`),
    (x) => x.join('\n'),
  );

  ctx.reply(
    'Топ за последнии 48 часов:\n\n\n' +
    (superTop.length > 0 ? 'Супер блядь топ:\n' + superTop + '\n\n' : 'Супер пиздатых сообщений не было(\n\n') +
    (top.length > 0 ? 'Топ:\n' + top + '\n\n' : 'Пиздатых сообщений не было(\n\n') +
    (bottom.length > 0 ? 'Хуетоп:\n' + bottom + '\n\n' : 'Хуёвых сообщений не было(\n\n'),
    { parse_mode: 'Markdown' }
  );

}

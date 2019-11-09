import 'core-js/stable';
import 'regenerator-runtime/runtime';
import logger from 'koa-logger';
import Router from 'koa-router';
const bodyParser = require('koa-bodyparser');

const Koa = require('koa');
const app = new Koa();
const router = new Router();

app.use(logger());
app.use(bodyParser());
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

let nextId = 0;

const createId = () => `task_${nextId++}`;

const task = (description, assignee, completed = false, id = createId()) => ({
  id,
  description,
  assignee: (typeof assignee === "string")? assignee : assignee.name,
  completed,
});

let user1 = { name: 'Melon Tusk', isBoss: true };
let user2 = { name: 'Lovely Engineer', isBoss: false };
let user3 = { name: 'Unemployed Person', isBoss: false };

let planned = [
  task('Colonize Mars', user1),
  task('Destroy earth', user1),
  task('Rule as king of all mankind', user1),
  task('Work all day', user2),
  task('Work all night', user2),
  task('Make fortune from nothing', user1, true),
  task('Build fleet of rockets', user1, true),
];


router.post('/api/tasks/', async(ctx) => {
  const { description, assignee } = ctx.request.body;
  const task_ = task(description, assignee);
  planned = [...planned, task_];
  ctx.body = { id: task.id };
});

router.get('/api/tasks/', (ctx) => {
  ctx.body = planned;
});

router.get('/api/users/', (ctx) => {
  ctx.body = [user1, user2, user3];
});

router.put('/api/tasks/:taskId/complete', (ctx) => {
  const taskId = ctx.params.taskId;
  const task = planned.find(({id}) => id === taskId );
  if(!task) {
    ctx.status=418
  }else {
    task.completed=true;
    ctx.status=200
  }
});

router.put('/api/tasks/:taskId/reset', (ctx) => {
  const taskId = ctx.params.taskId;
  const task = planned.find(({id}) => id === taskId );
  if(!task) {
    ctx.status=418
  }else {
    task.completed=false;
    ctx.status=200
  }
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(4000);

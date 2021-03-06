import { Command } from '../types';

import create from './create';
import deleteCmd from './delete';
import inspect from './inspect';
import tags from './tags';
import evalCmd from './eval';

export default [
  create,
  deleteCmd,
  inspect,
  tags,
  evalCmd,
] as Command[]

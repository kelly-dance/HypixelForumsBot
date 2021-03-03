import { Command } from '../types';

import create from './create';
import deleteCmd from './delete'; // delete is a keyword
import inspect from './inspect';
import tags from './tags';

export default [
  create,
  deleteCmd,
  inspect,
  tags,
] as Command[]

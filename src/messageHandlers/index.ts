import { configRepository } from '../userConfiguration/index'

import { SaveConfigurationHandler } from './SaveConfigurationHandler';
import { GetConfigurationHandler } from './GetConfigurationHandler';
import { DiceRollParsingHandler } from './DiceRollParsingHandler';
import { MessageDispatcher } from './MessageDispatcher';

const saveConfigurationHandler: SaveConfigurationHandler = new SaveConfigurationHandler(configRepository);
const getConfigurationhandler: GetConfigurationHandler = new GetConfigurationHandler(configRepository);
const defaultHandler: DiceRollParsingHandler = new DiceRollParsingHandler(configRepository);

const dispatcher: MessageDispatcher = new MessageDispatcher([saveConfigurationHandler, getConfigurationhandler], defaultHandler);

export { dispatcher };
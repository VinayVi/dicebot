import { userConfigurationService } from '../service/index'

import { SaveConfigurationHandler } from './SaveConfigurationHandler';
import { GetConfigurationHandler } from './GetConfigurationHandler';
import { DiceRollParsingHandler } from './DiceRollParsingHandler';
import { MessageDispatcher } from './MessageDispatcher';

const saveConfigurationHandler: SaveConfigurationHandler = new SaveConfigurationHandler(userConfigurationService);
const getConfigurationhandler: GetConfigurationHandler = new GetConfigurationHandler(userConfigurationService);
const defaultHandler: DiceRollParsingHandler = new DiceRollParsingHandler(userConfigurationService);

const dispatcher: MessageDispatcher = new MessageDispatcher([saveConfigurationHandler, getConfigurationhandler], defaultHandler);

export { dispatcher };
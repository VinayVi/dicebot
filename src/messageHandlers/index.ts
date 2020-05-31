import { SaveConfigurationHandler } from './SaveConfigurationHandler';
import { GetConfigurationHandler } from './GetConfigurationHandler';
import { DiceRollParsingHandler } from './DiceRollParsingHandler';
import { MessageDispatcher } from './MessageDispatcher';

const saveConfigurationHandler: SaveConfigurationHandler = new SaveConfigurationHandler();
const getConfigurationhandler: GetConfigurationHandler = new GetConfigurationHandler();
const defaultHandler: DiceRollParsingHandler = new DiceRollParsingHandler();

const dispatcher: MessageDispatcher = new MessageDispatcher([saveConfigurationHandler, getConfigurationhandler], defaultHandler);

export = dispatcher;
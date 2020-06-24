import { userConfigurationService } from '../service/index'

import { SaveConfigurationHandler } from './SaveConfigurationHandler';
import { GetConfigurationHandler } from './GetConfigurationHandler';
import { DiceRollParsingHandler } from './DiceRollParsingHandler';
import { MessageDispatcher } from './MessageDispatcher';
import { DeleteConfigurationHandler } from './DeleteConfigurationHandler';
import { HelpHandler } from './HelpHandler';
import { ImportConfigurationHandler } from './ImportConfigurationHandler';
import { ExportConfigurationHandler } from './ExportConfigurationHandler';

const saveConfigurationHandler = new SaveConfigurationHandler(userConfigurationService);
const getConfigurationhandler = new GetConfigurationHandler(userConfigurationService);
const deleteConfigurationHandler = new DeleteConfigurationHandler(userConfigurationService);
const importConfigurationHandler = new ImportConfigurationHandler(userConfigurationService);
const exportConfigurationhandler = new ExportConfigurationHandler(userConfigurationService);
const helphandler = new HelpHandler();

const defaultHandler: DiceRollParsingHandler = new DiceRollParsingHandler(userConfigurationService);

const dispatcher: MessageDispatcher = new MessageDispatcher([saveConfigurationHandler, getConfigurationhandler, deleteConfigurationHandler, importConfigurationHandler, exportConfigurationhandler,helphandler], defaultHandler);

export { dispatcher };
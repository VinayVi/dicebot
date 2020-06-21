import { MessageDispatcher } from "../../src/messageHandlers/MessageDispatcher"
import { DiscriminatingMessageHandler, MessageHandler } from "../../src/messageHandlers/MessageHandler";
import { Message } from "../../src/Message";

import { mock, mockClear } from 'jest-mock-extended';
import Discord from "discord.js";

const discriminatingHandler = mock<DiscriminatingMessageHandler>();
const defaultHandler = mock<MessageHandler>();
const messageDispatcher = new MessageDispatcher([discriminatingHandler], defaultHandler);

const message = mock<Discord.Message>();

jest.mock('../../src/discord.config.json', () => {
  return { 
    prefix: "prefix"
  };
});

beforeEach(() => {
  mockClear(discriminatingHandler);
  mockClear(defaultHandler);
  mockClear(message);
})

test("message that can go to discriminating handler goes there", () => {
  //given
  discriminatingHandler.supports.mockReturnValue(true);
  message.content = "prefix message";

  //when
  messageDispatcher.dispatchMessage(message);

  //then
  expect(discriminatingHandler.handle).toHaveBeenCalledTimes(1)
  expect(defaultHandler.handle).toHaveBeenCalledTimes(0)
})

test("message that cannot go to discriminating handler goes to default", () => {
  //given
  discriminatingHandler.supports.mockReturnValue(false);
  message.content = "prefix message";

  //when
  messageDispatcher.dispatchMessage(message);

  //then
  expect(discriminatingHandler.handle).toHaveBeenCalledTimes(0)
  expect(defaultHandler.handle).toHaveBeenCalledTimes(1)
})
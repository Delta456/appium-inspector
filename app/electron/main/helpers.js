import {clipboard, ipcMain, shell} from 'electron';
import fs from 'fs';

import i18n from './i18next';

export const isDev = process.env.NODE_ENV === 'development';

export function setupIPCListeners() {
  ipcMain.on('electron:openLink', (_evt, link) => shell.openExternal(link));
  ipcMain.on('electron:copyToClipboard', (_evt, text) => clipboard.writeText(text));
  ipcMain.handle('sessionfile:open', async (_evt, filePath) => openSessionFile(filePath));
}

// Open an .appiumsession file from the specified path and return its contents
export const openSessionFile = (filePath) => fs.readFileSync(filePath, 'utf8');

export const t = (string, params = null) => i18n.t(string, params);

export const APPIUM_SESSION_EXTENSION = 'appiumsession';

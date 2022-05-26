import { BaseProvider, EntityResolvable } from 'ioc:factory/Core/Provider'
import {Application} from "ioc:factory/Core";
import Logger from '@leadcodedev/logger'

export default class AppProvider implements BaseProvider {
  public async boot (): Promise<void> {
    Logger.send('info', 'Application start')
    // Your code here
  }

  public async load (Class: EntityResolvable): Promise<void> {
    Logger.send('info', `Load file ${Class.file?.relativePath}`)
    // Your code here
  }

  public async ok (): Promise<void> {
    Logger.send('info', 'Application is ready')
    const client = Application.getClient();
    client.user!.setPresence({
      afk: false,
      status: "idle",
      activities: [{
        name: "github.com/mathisaudureau",
        type: "STREAMING",
        url: "https://twitch.tv/mathisaudureau"
      }]
    });
  }
}
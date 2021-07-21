import { WEAckEnvironmentRequest, WESetEnvirnomentType, WESetEnvironmentRequest } from "backend/world-editor/world-editor-types";
import { makeAutoObservable, runInAction } from "mobx";
import { joaat } from "utils/joaat";
import { onWindowEvent } from "utils/windowMessages";

export const WEATHER = {
  CLEAR: 0,
  EXTRASUNNY: 0,
  CLOUDS: 0,
  OVERCAST: 0,
  RAIN: 0,
  CLEARING: 0,
  THUNDER: 0,
  SMOG: 0,
  FOGGY: 0,
  XMAS: 0,
  SNOWLIGHT: 0,
  BLIZZARD: 0,
};

export type WeatherType = keyof typeof WEATHER;

const WEATHER_MAP: Record<number, WeatherType> = {};

Object.keys(WEATHER).forEach((weather) => {
  WEATHER[weather] = joaat(weather);
  WEATHER_MAP[WEATHER[weather]] = weather as WeatherType;
});

export const WEEnvState = new class WEEnvState {
  public time: string = '0:0';
  public timeNum: number = 0;

  public prevWeather: WeatherType = 'EXTRASUNNY';
  public prevWeatherHash: number = WEATHER.EXTRASUNNY;

  public nextWeather: WeatherType = 'EXTRASUNNY';
  public nextWeatherHash: number = WEATHER.EXTRASUNNY;

  constructor() {
    makeAutoObservable(this);

    onWindowEvent('we:ackEnvironment', (request: WEAckEnvironmentRequest) => runInAction(() => {
      this.updateTime(request.hours, request.minutes);

      this.prevWeather = WEATHER_MAP[request.prevWeather];
      this.prevWeatherHash = request.prevWeather;

      this.nextWeather = WEATHER_MAP[request.nextWeather];
      this.nextWeatherHash = request.nextWeather;
    }));
  }

  setWeather(weather: WeatherType) {
    sendGameClientEvent('we:setEnvironment', JSON.stringify({
      type: WESetEnvirnomentType.PERSISTENT_WEATHER,
      weather,
    } as WESetEnvironmentRequest));
  }

  setRandomWeather() {
    sendGameClientEvent('we:setEnvironment', JSON.stringify({
      type: WESetEnvirnomentType.RANDOM_WEATHER,
    } as WESetEnvironmentRequest));
  }

  setTime(hours: number, minutes: number) {
    this.updateTime(hours, minutes);

    sendGameClientEvent('we:setEnvironment', JSON.stringify({
      type: WESetEnvirnomentType.TIME,
      hours,
      minutes,
    } as WESetEnvironmentRequest));
  }

  setTimeNum(numString: string) {
    const num = parseInt(numString, 10);

    const hours = num/60|0;
    const minutes = num%60;

    this.setTime(hours, minutes);
  }

  private updateTime(hours: number, minutes: number) {
    this.time = `${hours}:${minutes}`;
    this.timeNum = hours * 60 + minutes;
  }
}

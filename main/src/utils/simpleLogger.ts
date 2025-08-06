/**
 * Simple logger utility to reduce console verbosity
 * Respects production vs development modes
 */

enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  VERBOSE = 4
}

class SimpleLogger {
  private isDevelopment: boolean;
  private currentLevel: LogLevel;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV !== 'production';
    // In development: show INFO and above, in production: only WARN and above
    this.currentLevel = this.isDevelopment ? LogLevel.INFO : LogLevel.WARN;
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.currentLevel;
  }

  error(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(`[ERROR] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  verbose(message: string, ...args: any[]): void {
    if (this.shouldLog(LogLevel.VERBOSE)) {
      console.log(`[VERBOSE] ${message}`, ...args);
    }
  }

  // Allow runtime level changes for debugging
  setLogLevel(level: 'error' | 'warn' | 'info' | 'debug' | 'verbose'): void {
    const levelMap = {
      error: LogLevel.ERROR,
      warn: LogLevel.WARN,
      info: LogLevel.INFO,
      debug: LogLevel.DEBUG,
      verbose: LogLevel.VERBOSE
    };
    this.currentLevel = levelMap[level];
  }
}

// Export singleton instance
export const logger = new SimpleLogger();
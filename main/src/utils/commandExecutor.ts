import { execSync as nodeExecSync, ExecSyncOptions, ExecSyncOptionsWithStringEncoding, ExecSyncOptionsWithBufferEncoding, exec, ExecOptions } from 'child_process';
import { promisify } from 'util';
import { getShellPath } from './shellPath';
import { logger } from './simpleLogger';

const nodeExecAsync = promisify(exec);

class CommandExecutor {
  execSync(command: string, options: ExecSyncOptionsWithStringEncoding): string;
  execSync(command: string, options?: ExecSyncOptionsWithBufferEncoding): Buffer;
  execSync(command: string, options?: ExecSyncOptions): string | Buffer {
    logger.debug(`Executing: ${command.substring(0, 50)}${command.length > 50 ? '...' : ''}`);

    // Get enhanced shell PATH
    const shellPath = getShellPath();
    
    // Merge enhanced PATH into options
    const enhancedOptions = {
      ...options,
      env: {
        ...process.env,
        ...options?.env,
        PATH: shellPath
      }
    };

    try {
      const result = nodeExecSync(command, enhancedOptions as any);
      logger.debug(`Command succeeded`);
      return result;
    } catch (error: any) {
      logger.error(`Command failed: ${command.substring(0, 50)}${command.length > 50 ? '...' : ''} - ${error.message}`);
      throw error;
    }
  }

  async execAsync(command: string, options?: ExecOptions & { timeout?: number }): Promise<{ stdout: string; stderr: string }> {
    logger.debug(`Executing async: ${command.substring(0, 50)}${command.length > 50 ? '...' : ''}`);

    // Get enhanced shell PATH
    const shellPath = getShellPath();
    
    // Set up timeout (default 10 seconds)
    const timeout = options?.timeout || 10000;
    
    // Merge enhanced PATH into options
    const enhancedOptions: ExecOptions = {
      ...options,
      timeout,
      env: {
        ...process.env,
        ...options?.env,
        PATH: shellPath
      }
    };

    try {
      const result = await nodeExecAsync(command, enhancedOptions);
      logger.debug(`Async command succeeded`);
      return result;
    } catch (error: any) {
      logger.error(`Async command failed: ${command.substring(0, 50)}${command.length > 50 ? '...' : ''} - ${error.message}`);
      throw error;
    }
  }
}

// Export a singleton instance
export const commandExecutor = new CommandExecutor();

// Export the execSync function as a drop-in replacement
export const execSync = commandExecutor.execSync.bind(commandExecutor);

// Export the execAsync function
export const execAsync = commandExecutor.execAsync.bind(commandExecutor);
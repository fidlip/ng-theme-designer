import { Injectable } from '@angular/core';
import { Json } from './json.model';
import { updatedDiff } from 'deep-object-diff';
import Material from '@primeng/themes/material';

@Injectable({
  providedIn: 'root'
})
export class PngThemeService {

  /**
   * Generates a downloadable theme file
   * @param themeConfig The theme configuration
   * @returns A blob URL for the generated file
   */
  private generateThemeBlob(themeConfig: any): string {
    let themeContent = `import { definePreset } from '@primeng/themes';\n`;
    themeContent += `import Material from '@primeng/themes/material';\n\n`;
    themeContent += `export const MyPreset = definePreset(Material, ${JSON.stringify(themeConfig, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/"__REF__([^"]+)"/g, "{$1}")
    });\n`;

    const blob = new Blob([themeContent], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  }

  private generateThemeDiffBlob(themeConfig: any): string {
    const diffJson = updatedDiff(Material, themeConfig);

    let themeContent = `export const AeThemeDiff = ${JSON.stringify(diffJson, null, 2)
      .replace(/"([^"]+)":/g, "$1:")
      .replace(/"__REF__([^"]+)"/g, "{$1}")
    };\n`;

    const blob = new Blob([themeContent], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  }

  downloadThemeFile(themeConfig: Json): void {
    const themeBlob = this.generateThemeBlob(themeConfig);
    this.downloadFile('theme.ts', themeBlob);
  }

  downloadThemeDiffFile(themeConfig: Json): void {
    const themeDiffBlob = this.generateThemeDiffBlob(themeConfig);
    this.downloadFile('theme-diff.ts', themeDiffBlob);
  }

  /**
   * Generate a downloadable theme file
   */
  private downloadFile(fileName: string, blobUrl: string): void {
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(link);
  }
}

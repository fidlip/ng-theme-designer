import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {MaterialBaseDesignTokens} from '@primeng/themes/material/base';

import {Theme} from '@primeng/themes';
import {PngThemeService} from './png-theme.service';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {Tooltip} from 'primeng/tooltip';
import {isJson} from './json.model';
import {ProgressSpinner} from 'primeng/progressspinner';
import {Drawer} from 'primeng/drawer';
import {Button} from 'primeng/button';
import {TabSectionComponent} from './tab-section/tab-section.component';
import {IsJsonPipe} from './is-json.pipe';

@Component({
  selector: 'png-theme-designer',
  templateUrl: './theme-designer.component.html',
  imports: [
    TabPanel,
    FormsModule,
    CommonModule,
    Tabs,
    TabPanels,
    TabPanel,
    TabPanel,
    TabList,
    Tab,
    Tooltip,
    ProgressSpinner,
    Drawer,
    Button,
    TabSectionComponent,
    IsJsonPipe,
  ],
  styleUrls: ['./theme-designer.component.scss'],
  standalone: true,
})
export class ThemeDesignerComponent implements OnChanges {
  @Input() title: string = 'Designer';
  @Input({required: true}) theme?: MaterialBaseDesignTokens;
  @Input() drawerVisible = true;

  @Output() close = new EventEmitter<void>();

  protected themeSections: Array<{ key: string; value: unknown }> = [];
  protected loading = true;

  private themeService = inject(PngThemeService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['theme'] && this.theme) {
      this.themeSections = Object.entries(this.theme).map(([key, value]) => ({key, value}));
      this.serveLoadingState();
    }
  }

  /**
   * Serves a loading state for the theme designer
   * Theme has a huge amount of data, so we need to show of loading state until it's loaded and fully rendered.
   */
  serveLoadingState() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 0);
  }

  /**
   * Downloads the theme configuration as a TypeScript file
   */
  onDownloadTheme(): void {
    if (isJson(this.theme)) {
      this.themeService.downloadThemeDiffFile(this.theme);
    }
  }

  /**
   * Closes the theme designer
   */
  onClose(): void {
    this.close.emit();
  }

  toggleDarkMode(): void {
    window.document.body.classList.toggle('png-dark-mode');
  }

  onApplyTheme(): void {
    Theme.setTheme({preset: this.theme});
  }
}

import {Component, Input} from '@angular/core';
import {JsonPropertyType} from '../json.model';
import {FormsModule} from '@angular/forms';
import {PaletteSectionComponent} from '../palette-section/palette-section.component';
import {IsJsonPipe} from '../is-json.pipe';
import {IsPalettePipe} from '../is-palette.pipe';
import {InputText} from 'primeng/inputtext';
import {FloatLabel} from 'primeng/floatlabel';

@Component({
  selector: 'png-section-content',
  imports: [
    FormsModule,
    PaletteSectionComponent,
    IsJsonPipe,
    IsPalettePipe,
    InputText,
    FloatLabel,
  ],
  templateUrl: './section-content.component.html',
  styleUrl: './section-content.component.scss',
  standalone: true,
})
export class SectionContentComponent {
  @Input({required: true}) header!: string;
  @Input({required: true}) sectionConfig!: JsonPropertyType;
  @Input({required: true}) key!: string;
}

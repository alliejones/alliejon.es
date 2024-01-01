---
title: "Full-bleed images with TCPDF"
date: 2013-06-07T12:00:00-04:00
archived: true
---

The current PHP project I'm working on needs to generate PDFs, and I'm using the [TCPDF class](http://www.tcpdf.org/) to do so. TCPDF, while powerful, has [documentation](http://www.tcpdf.org/doc/code/classTCPDF.html) that is ... not very user-friendly, to put it mildly.

I ran into problems trying to display an SVG file as a full-bleed image (that is, I didn't want white space between the edges of the PDF document and the image). I would set the document size and the SVG display size to the same values, and set the document margins to zero, and yet, infuriatingly, my SVG file would display just _slightly_ smaller than the full page size.

After some searching and experimentation, I found another margin property that needed to be changed. To remove _all_ of the margins on a TCPDF-generated PDF file, you need to set the bottom margin of each page via the `setPageOrientation` method as well as `setMargins`.

The bottom margin was creating whitespace on the file's right edge as well, because the SVG file was maintaining its original aspect ratio.

The full code to remove all of the margins on the page was this (the header and footer also have to be disabled):

```php
<?php
$pdf = new TCPDF(/* ... */);
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);
$pdf->setMargins(0, 0, 0, true);
$pdf->setPageOrientation('', false, 0);
// the third argument above is the bottom margin size
```

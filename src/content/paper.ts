export interface Footnote {
  id: number;
  text: string;
}

export interface FigureRef {
  id: string;
  position: 'after-paragraph';
  paragraphIndex: number;
}

export interface PaperSection {
  id: string;
  number?: number;
  title: string;
  paragraphs: string[];
  figures?: FigureRef[];
  footnotes?: Footnote[];
}

export const paperMetadata = {
  title: 'Obesity and the Politics of Taddeo di Bartolo\u2019s Inferno',
  subtitle: 'Stefania Roccas Gandal',
  author: 'Stefania Roccas Gandal',
  journal: 'Renaissance Studies',
  published: '16 March 2026',
  doi: '10.1111/rest.70030',
};

export const sections: PaperSection[] = [
  {
    id: 'abstract',
    title: 'Abstract',
    paragraphs: [
      'In 1393, the Sienese painter Taddeo di Bartolo completed a monumental <em>Last Judgment</em> fresco on the interior entrance wall of the Collegiata di Santa Maria Assunta in San Gimignano (Figure 1). The fresco\u2019s depiction of Hell is especially striking for its vivid portrayal of obese sinners suffering gruesome punishments. This paper argues that Taddeo\u2019s emphasis on corpulence in his representation of the damned\u2014particularly the gluttons\u2014was not merely an iconographic convention but a deliberate visual polemic aimed at the Dominican Order, whose presence in San Gimignano had been a source of tension with the Augustinian canons who controlled the Collegiata. By examining the fresco within the context of mendicant rivalries, Dantesque literary traditions, and medieval attitudes toward the body and sin, this study demonstrates how Taddeo weaponized the obese body as a tool of moral and political critique.',
    ],
    figures: [
      { id: 'fig-1', position: 'after-paragraph', paragraphIndex: 0 },
    ],
  },
  {
    id: 'introduction',
    number: 1,
    title: 'Introduction',
    paragraphs: [
      'The interior entrance wall of the Collegiata di Santa Maria Assunta in San Gimignano presents the visitor with one of the most viscerally compelling <em>Last Judgment</em> compositions of the Italian <em>Trecento</em> (Figure 2). Painted by the Sienese artist Taddeo di Bartolo in 1393, the fresco sprawls across the <em>controfacciata</em>, enveloping the viewer in a panoramic vision of humanity\u2019s final reckoning. At its center, Christ sits enthroned in a mandorla, flanked by the Virgin and John the Baptist in the traditional <em>Deesis</em> composition. To Christ\u2019s right, the blessed ascend toward Paradise; to his left, the damned tumble into a Hell of extraordinary invention and brutality.',
      'It is the Hell that commands the most attention\u2014both from modern visitors and, one suspects, from the medieval congregants who passed beneath it each time they exited the church. Taddeo populated his infernal landscape with a remarkable cast of sinners whose punishments are catalogued with an almost encyclopedic thoroughness. Among the seven deadly sins depicted, gluttony receives a treatment of particular vividness: corpulent figures, their bloated bodies rendered with an unflinching naturalism, are subjected to torments that mirror and mock their earthly excesses.',
      'The scholarly literature on this fresco has tended to situate it within the broader tradition of Italian <em>Last Judgment</em> painting, noting Taddeo\u2019s debts to earlier Tuscan models\u2014particularly the <em>Hell</em> frescoes in the Camposanto at Pisa and the Strozzi Chapel in Santa Maria Novella, Florence.<sup>1</sup> While these comparisons are illuminating, they have generally failed to account for the specificity of Taddeo\u2019s treatment of corpulence and its potential significance within the local context of San Gimignano. Why did the artist lavish such attention on the obese body? Why does gluttony occupy such a prominent position in his infernal hierarchy?',
      'This paper proposes that the answer lies in the intersection of three contexts: the political and religious dynamics of late fourteenth-century San Gimignano, the literary tradition of Dante\u2019s <em>Divina Commedia</em>, and medieval moral theology\u2019s treatment of the body as a legible sign of spiritual condition. I argue that Taddeo\u2019s depiction of obese sinners constituted a visual polemic\u2014a calculated critique directed at the Dominican Order, whose convent of San Domenico stood barely three hundred meters from the Collegiata\u2019s doors. The Dominicans\u2019 growing influence in San Gimignano had brought them into conflict with the Augustinian canons who administered the Collegiata, and the fresco\u2019s emphasis on gluttony and corpulence, I contend, was designed to associate the rival order with the sin of excess.',
      'The argument proceeds in four stages. Section 2 examines the historical relationship between San Gimignano\u2019s religious institutions and the specific tensions between the Augustinian and Dominican communities, situating the Collegiata fresco within this competitive landscape. Section 3 explores the medieval understanding of corpulence as a moral signifier, drawing on theological, medical, and literary sources to establish the symbolic vocabulary that Taddeo\u2019s audience would have brought to their reading of the fresco. Section 4 offers a detailed formal and iconographic analysis of the Hell scene, with particular attention to the treatment of the sinners\u2019 bodies. Section 5 focuses specifically on the depiction of gluttony, arguing that its visual rhetoric draws on and transforms Dantesque models in ways that point toward a specifically anti-Dominican message.',
    ],
    figures: [
      { id: 'fig-2', position: 'after-paragraph', paragraphIndex: 0 },
    ],
    footnotes: [
      {
        id: 1,
        text: 'See especially Diana Norman, <em>Painting in Late Medieval and Renaissance Siena (1260\u20131555)</em> (New Haven: Yale University Press, 2003), 112\u201318; and Enzo Carli, <em>Le pitture della Collegiata di San Gimignano</em> (Milan: Electa, 1962).',
      },
    ],
  },
  {
    id: 'san-gimignano-dante-dominicans',
    number: 2,
    title: 'San Gimignano, Dante Alighieri and the Dominicans',
    paragraphs: [
      'San Gimignano in the late fourteenth century was a town whose political and cultural life was profoundly shaped by the competing claims of its religious institutions (Figure 3). The Collegiata di Santa Maria Assunta, elevated to collegiate status in 1056, served as the principal church of the town and was administered by a chapter of Augustinian canons.<sup>2</sup> The Augustinians\u2019 position was one of considerable prestige: the Collegiata stood at the civic and spiritual heart of San Gimignano, occupying the main piazza alongside the Palazzo del Popolo, and its canons exercised significant influence over the town\u2019s religious life.',
      'The Dominican presence in San Gimignano dated to the mid-thirteenth century, when the Order of Preachers established a convent dedicated to San Pietro, later rededicated to San Domenico, on the northern edge of the town.<sup>3</sup> The Dominicans\u2019 arrival was part of the broader expansion of the mendicant orders into Tuscan urban centers during the <em>Duecento</em>, a process that frequently generated friction with existing ecclesiastical establishments. In San Gimignano, this friction was compounded by the town\u2019s relatively modest size: unlike Florence or Siena, where multiple religious institutions could coexist within a large urban fabric, San Gimignano\u2019s compact geography meant that the Dominicans and the Augustinian canons of the Collegiata were in direct competition for the spiritual allegiance\u2014and the charitable donations\u2014of the same population.',
      'The tensions between the two communities manifested in various ways throughout the fourteenth century. Disputes over burial rights, the administration of sacraments, and the solicitation of alms were common sources of conflict between mendicant orders and secular clergy throughout medieval Italy, and San Gimignano was no exception.<sup>4</sup> The Dominicans\u2019 emphasis on preaching and their cultivation of lay devotion through confraternities posed a particular challenge to the Collegiata\u2019s traditional role as the primary locus of communal worship. By the 1390s, when Taddeo received his commission, these rivalries had been simmering for over a century.',
      'The commission of the <em>Last Judgment</em> fresco itself must be understood within this competitive context. The Collegiata\u2019s chapter would have been keenly aware that a monumental painted program could serve not only devotional and didactic purposes but also institutional ones\u2014asserting the Collegiata\u2019s prestige and, implicitly, the authority of its Augustinian canons against their Dominican rivals. The choice of Taddeo di Bartolo, a painter whose career was closely associated with Sienese institutional patronage, suggests a patron confident in the artist\u2019s ability to produce a work of both visual sophistication and programmatic purpose.<sup>5</sup>',
      'The Dantesque dimension of this context deserves particular emphasis. Dante Alighieri had a documented connection to San Gimignano: in 1300, in his capacity as a prior of Florence, he visited the town as an ambassador of the Guelph League and addressed its council in the Palazzo del Popolo.<sup>6</sup> This visit was a source of considerable civic pride, and by the late fourteenth century, Dante\u2019s <em>Divina Commedia</em> had become deeply embedded in the cultural life of Tuscan towns like San Gimignano. The poem\u2019s vivid topography of the afterlife provided an authoritative literary model for visual representations of Hell, and artists throughout Tuscany drew upon its imagery in their painted programs.',
      'Dante\u2019s treatment of gluttony in <em>Inferno</em> VI is of particular relevance. The gluttons are punished in the Third Circle of Hell, where they lie in a foul slush, pelted by a ceaseless, cold, and heavy rain:',
      '<blockquote>Io sono al terzo cerchio, de la piova<br/>etterna, maladetta, fredda e greve;<br/>regola e qualit\u00e0 mai non l\u2019\u00e8 nova.<br/><br/>Grandine grossa, acqua tinta e neve<br/>per l\u2019aere tenebroso si riversa;<br/>pute la terra che questo riceve.<br/><br/>Cerbero, fiera crudele e diversa,<br/>con tre gole caninamente latra<br/>sovra la gente che quivi \u00e8 sommersa.</blockquote>',
      '(I am in the third circle, of the eternal, accursed, cold, and heavy rain; its rule and quality are never new. Great hailstones, foul water, and snow pour down through the dark air; the ground that receives them stinks. Cerberus, a cruel and monstrous beast, barks with three throats like a dog over the people who are submerged here.)<sup>7</sup>',
      'Dante\u2019s gluttons are notably passive\u2014they lie prone, barely distinguishable from the mire that engulfs them. Their punishment strips them of the individuality and agency that their earthly appetite asserted; they are reduced to anonymous, suffering flesh. This literary model was available to Taddeo, but as we shall see, he transformed it in significant ways that served his patrons\u2019 polemical purposes.',
    ],
    figures: [
      { id: 'fig-3', position: 'after-paragraph', paragraphIndex: 0 },
    ],
    footnotes: [
      {
        id: 2,
        text: 'On the history of the Collegiata, see Enrico Fiumi, <em>Storia economica e sociale di San Gimignano</em> (Florence: Olschki, 1961), 178\u201395.',
      },
      {
        id: 3,
        text: 'For the Dominican establishment in San Gimignano, see Luigi Pecori, <em>Storia della terra di San Gimignano</em> (Florence: Tipografia Galileiana, 1853), 306\u201312.',
      },
      {
        id: 4,
        text: 'On mendicant-secular clergy conflicts more broadly, see C. H. Lawrence, <em>The Friars: The Impact of the Mendicant Orders on Medieval Society</em> (London: Longman, 1994), chapter 5.',
      },
      {
        id: 5,
        text: 'On Taddeo\u2019s career and patronage networks, see Gail Solberg, <em>Taddeo di Bartolo: His Life and Work</em> (PhD diss., New York University, 1991).',
      },
      {
        id: 6,
        text: 'Dante\u2019s embassy to San Gimignano is recorded in the town\u2019s civic records. See Fiumi, <em>Storia economica</em>, 254\u201355.',
      },
      {
        id: 7,
        text: 'Dante Alighieri, <em>Inferno</em> VI.7\u201315. Translation by the author.',
      },
    ],
  },
  {
    id: 'corpulence-moral-signifier',
    number: 3,
    title: 'Corpulence as a Moral Signifier',
    paragraphs: [
      'To understand the polemical force of Taddeo\u2019s obese sinners, it is necessary to reconstruct the medieval semiotic of the fat body. In the moral theology of the Latin West, corpulence was far from a neutral physical characteristic; it was a legible sign, a bodily text that could be read for evidence of spiritual condition.<sup>8</sup>',
      'The theological foundations of this reading were well established by the fourteenth century. Thomas Aquinas, in his discussion of gluttony (<em>gula</em>) in the <em>Summa Theologiae</em>, identified five species of the sin: eating too soon (<em>praepropere</em>), too expensively (<em>laute</em>), too much (<em>nimis</em>), too eagerly (<em>ardenter</em>), and with excessive refinement (<em>studiose</em>).<sup>9</sup> Of these, <em>nimis</em>\u2014excessive quantity\u2014was the species most directly associated with corpulence, and it was the one that left the most visible trace on the sinner\u2019s body. The fat body thus became a kind of permanent confession, an involuntary advertisement of the sin of excess.',
      'This association between corpulence and moral failing was reinforced by medieval medical theory, which understood the body in humoral terms. Excessive flesh was attributed to an imbalance of the cold and moist humor (phlegm), which was itself associated with sluggishness, sensuality, and a lack of rational self-governance.<sup>10</sup> The fat body was thus doubly condemned: by theology as evidence of gluttony, and by medicine as evidence of a temperament dominated by the lower, animal faculties rather than by reason.',
      'The visual arts of the <em>Trecento</em> participated actively in this discourse. In representations of the <em>Last Judgment</em> and of Hell, artists routinely distinguished between the bodies of the saved and the damned. The blessed were typically depicted with idealized, slender bodies that conformed to classical proportions, while the damned were shown with bodies that were variously distorted, emaciated, or swollen.<sup>11</sup> Corpulence, in this visual economy, was a marker of damnation\u2014a sign that the soul had been enslaved by its appetites and had forfeited the rational self-mastery that was the precondition of salvation.',
      'The association between fatness and religious hypocrisy had a particular resonance in the context of the mendicant orders. The friars\u2014both Dominican and Franciscan\u2014had been founded on principles of voluntary poverty and ascetic discipline, and the contrast between their professed ideals and their actual practices was a perennial source of anticlerical satire. Boccaccio\u2019s <em>Decameron</em>, composed in the aftermath of the Black Death, is rich in portraits of fat, greedy friars whose corpulence betrays their hypocrisy.<sup>12</sup> The figure of the fat friar had become, by the late fourteenth century, a recognizable literary and visual type\u2014one that audiences in towns like San Gimignano would have had no difficulty identifying.',
      'It is important to note, however, that the satirical charge of the fat body was not distributed equally among the mendicant orders. The Dominicans, as the Order of Preachers, had cultivated a particular association with intellectual labor and with the regulation of orthodoxy through the Inquisition. Their reputation was one of learning and authority rather than of the radical poverty associated with the early Franciscans. This distinction made the Dominicans especially vulnerable to accusations of worldliness and excess: if a friar was fat, the satirical implication was that he had abandoned the ascetic discipline of his vocation in favor of the comforts of the table.<sup>13</sup>',
    ],
    footnotes: [
      {
        id: 8,
        text: 'On the medieval semiotics of the body, see Caroline Walker Bynum, <em>Holy Feast and Holy Fast: The Religious Significance of Food to Medieval Women</em> (Berkeley: University of California Press, 1987), especially chapters 2\u20133.',
      },
      {
        id: 9,
        text: 'Thomas Aquinas, <em>Summa Theologiae</em> IIa-IIae, q. 148, a. 4.',
      },
      {
        id: 10,
        text: 'On the humoral theory of corpulence, see Nancy G. Siraisi, <em>Medieval and Early Renaissance Medicine: An Introduction to Knowledge and Practice</em> (Chicago: University of Chicago Press, 1990), 104\u201310.',
      },
      {
        id: 11,
        text: 'On body types in <em>Last Judgment</em> iconography, see Jill Caskey, <em>Art and Patronage in the Medieval Mediterranean: Merchant Culture in the Region of Amalfi</em> (Cambridge: Cambridge University Press, 2004), 189\u201395.',
      },
      {
        id: 12,
        text: 'See especially <em>Decameron</em> I.6, III.8, and VI.10 for satirical portraits of mendicant friars.',
      },
      {
        id: 13,
        text: 'On the Dominican reputation for worldliness, see William A. Hinnebusch, <em>The History of the Dominican Order</em>, 2 vols. (New York: Alba House, 1966\u201373), 2:255\u201370.',
      },
    ],
  },
  {
    id: 'taddeo-sinners-hell',
    number: 4,
    title: 'Taddeo di Bartolo and Sinners in Hell',
    paragraphs: [
      'Taddeo di Bartolo\u2019s Hell occupies the lower left portion of the <em>controfacciata</em>, balancing the depiction of Paradise on the opposite side (Figure 4). The composition is organized around the colossal figure of Lucifer, who sits enthroned at the center of the infernal realm, devouring sinners in a direct visual echo of the Satanic figure in earlier Tuscan <em>Last Judgment</em> paintings. Around Lucifer, the various punishments of the damned are arranged in loosely defined zones corresponding to the seven deadly sins, each identified by an inscription.',
      'What distinguishes Taddeo\u2019s Hell from its predecessors is the remarkable attention paid to the bodies of the sinners (Figure 5). While earlier painters\u2014Giotto at the Arena Chapel, Nardo di Cione at Santa Maria Novella\u2014had depicted the damned with a degree of physical differentiation, Taddeo pushed this differentiation to an unprecedented extreme. His sinners are not generic suffering bodies; they are individualized physical types whose bodily characteristics correspond to and comment upon their specific sins.',
      'This is especially evident in the treatment of the sinners punished for carnal and appetitive sins. The lustful are depicted with bodies that retain a sensual beauty even in their torment, while the wrathful are shown with muscular, tensed bodies that strain against their restraints. But it is the gluttons who receive the most elaborate physical characterization: their bodies are swollen, heavy, and emphatically fleshy, rendered with a naturalistic attention to rolls of fat, sagging bellies, and the gravitational pull of excessive flesh (Figure 6).',
      'The formal qualities of these corpulent bodies are worth examining in detail. Taddeo employed several pictorial strategies to emphasize their bulk. First, he used a broader palette of flesh tones for the gluttons than for the other sinners, modulating from ruddy pinks to sallow yellows in a way that suggests the unhealthy complexion associated with overindulgence. Second, he positioned the gluttons\u2019 bodies in ways that accentuated their weight: they slump, sag, and sprawl in postures that contrast sharply with the more dynamic, contorted poses of the other damned. Third, he gave the gluttons a scale that exceeds that of the surrounding figures, making their corpulence a compositional as well as a narrative element (Figure 7).',
      'The contrast with earlier treatments of the same subject is instructive. In Nardo di Cione\u2019s <em>Hell</em> in the Strozzi Chapel (c. 1354\u201357), the gluttons are present but occupy a relatively minor position in the overall composition, and their bodies are not significantly differentiated from those of the other sinners (Figure 8). In the Camposanto frescoes at Pisa, attributed to Buonamico Buffalmacco, the emphasis falls on the demonic tormentors rather than on the physical characteristics of the sinners themselves. Taddeo\u2019s innovation was to make the sinner\u2019s body itself the primary vehicle of meaning\u2014to treat corpulence not merely as an attribute but as an argument.<sup>14</sup>',
    ],
    figures: [
      { id: 'fig-4', position: 'after-paragraph', paragraphIndex: 0 },
      { id: 'fig-5', position: 'after-paragraph', paragraphIndex: 1 },
      { id: 'fig-6', position: 'after-paragraph', paragraphIndex: 2 },
      { id: 'fig-7', position: 'after-paragraph', paragraphIndex: 3 },
      { id: 'fig-8', position: 'after-paragraph', paragraphIndex: 4 },
    ],
    footnotes: [
      {
        id: 14,
        text: 'For comparative analysis of Tuscan <em>Last Judgment</em> frescoes, see Joachim Poeschke, <em>Italian Frescoes: The Age of Giotto, 1280\u20131400</em> (New York: Abbeville Press, 2005), 340\u201356.',
      },
    ],
  },
  {
    id: 'taddeos-depiction-gluttony',
    number: 5,
    title: 'Taddeo\u2019s Depiction of Gluttony',
    paragraphs: [
      'The zone of gluttony in Taddeo\u2019s Hell deserves close and sustained attention, for it is here that the polemical argument of the fresco is most fully articulated (Figure 9). The gluttons occupy a prominent position in the lower register of the Hell scene, directly visible to viewers entering or exiting the church. Their placement ensures maximum visibility and impact\u2014this is not a sin relegated to the margins but one that the composition insists the viewer confront.',
      'The punishment of the gluttons follows the medieval principle of <em>contrapasso</em>\u2014the poetic justice by which the punishment mirrors the sin. Demons force-feed the gluttons with noxious substances, inverting the pleasure of the table into a torment of the gullet. Other gluttons are shown vomiting or being disemboweled, their innards exposed in a grotesque parody of the satisfaction they once derived from filling their bellies. The imagery is deliberately revolting, designed to provoke disgust and, through disgust, moral edification.',
      'But the most significant aspect of Taddeo\u2019s treatment of gluttony is the way he used the gluttons\u2019 corpulence to evoke specific social and institutional associations. The obese sinners in the gluttony zone are not depicted as generic figures of excess; they wear elements of clerical dress that, while partially obscured by their torments, would have been recognizable to a contemporary audience (Figure 10). Several of the corpulent figures retain fragments of tonsured hair, and at least one appears to wear the remnants of a religious habit\u2014details that pointedly associate the sin of gluttony with members of the clergy.<sup>15</sup>',
      'The identification becomes more specific when we consider the visual context. The Dominican convent of San Domenico was known in San Gimignano for its hospitality and for the quality of its table\u2014a reputation that, whether deserved or not, would have made the connection between the obese clerical gluttons in the fresco and the Dominicans difficult to miss.<sup>16</sup> The Augustinian canons who commissioned the fresco would have been well aware of these associations, and it is difficult to imagine that they were accidental.',
      'The Dantesque dimension reinforces this reading. Dante\u2019s treatment of gluttony in <em>Inferno</em> VI is relatively restrained\u2014the gluttons lie in filth, but their punishment is passive rather than active, and Dante does not emphasize their corpulence. Taddeo\u2019s departure from this model is therefore significant: by making the gluttons actively corpulent and by subjecting them to punishments that specifically target their excessive bodies, he transformed the Dantesque source material in ways that served a local, institutional agenda. The gluttons\u2019 obesity is not merely illustrative; it is accusatory (Figure 11).',
      'Furthermore, the inscriptions that accompany the gluttony zone use language that echoes the specific terms of Dominican self-representation. The word <em>ghiotti</em> (gluttons) appears prominently, but so too do references to <em>predicatori</em> (preachers)\u2014a term that was virtually synonymous with the Dominican Order, the <em>Ordo Praedicatorum</em> (Figure 12). Whether these inscriptions were part of Taddeo\u2019s original program or were added later is a matter of scholarly debate, but their presence in the fresco as it survives today underscores the anti-Dominican reading that the visual evidence supports.<sup>17</sup>',
      'The cumulative effect of these visual and textual strategies is a representation of gluttony that functions simultaneously on two levels: as a general moral warning against the sin of excess, legible to any Christian viewer; and as a specific institutional critique, legible to the community of San Gimignano that knew the local context of Augustinian-Dominican rivalry. This double register\u2014universal moral teaching and local political commentary\u2014is characteristic of much medieval religious art, but Taddeo\u2019s exploitation of it is unusually pointed and effective.',
    ],
    figures: [
      { id: 'fig-9', position: 'after-paragraph', paragraphIndex: 0 },
      { id: 'fig-10', position: 'after-paragraph', paragraphIndex: 2 },
      { id: 'fig-11', position: 'after-paragraph', paragraphIndex: 4 },
      { id: 'fig-12', position: 'after-paragraph', paragraphIndex: 5 },
    ],
    footnotes: [
      {
        id: 15,
        text: 'The identification of tonsured and habited figures among the damned is discussed in Solberg, <em>Taddeo di Bartolo</em>, 198\u2013205.',
      },
      {
        id: 16,
        text: 'On the Dominican convent\u2019s reputation, see Pecori, <em>Storia della terra</em>, 310\u201311.',
      },
      {
        id: 17,
        text: 'On the inscriptions and their dating, see Carli, <em>Le pitture della Collegiata</em>, 45\u201348.',
      },
    ],
  },
  {
    id: 'conclusion',
    number: 6,
    title: 'Conclusion',
    paragraphs: [
      'Taddeo di Bartolo\u2019s <em>Last Judgment</em> in the Collegiata of San Gimignano is a work that rewards close looking and contextual reading in equal measure. On one level, it participates in a well-established tradition of monumental <em>Last Judgment</em> painting in Tuscany, drawing on the visual vocabularies established by Giotto, the Lorenzetti, Nardo di Cione, and the Pisan Camposanto masters. On another level, it is a deeply local work\u2014a product of the specific institutional, political, and cultural circumstances of late fourteenth-century San Gimignano.',
      'The emphasis on corpulence in the Hell scene, and particularly in the depiction of gluttony, is the key to this local dimension. By rendering the gluttons as emphatically obese bodies marked by the signs of clerical identity, Taddeo created a visual argument that operated within and against the Dominican presence in San Gimignano. The fat body of the glutton became a weapon\u2014a polemical instrument deployed by the Augustinian canons of the Collegiata against their mendicant rivals.',
      'This reading does not diminish the fresco\u2019s devotional or aesthetic significance. The <em>Last Judgment</em> remains a powerful work of religious art, capable of inspiring the fear of damnation and the hope of salvation that were its primary pastoral purposes. But it also reminds us that medieval religious art was never produced in a vacuum: it was shaped by the interests, anxieties, and ambitions of its patrons, and it spoke to audiences who brought to it a rich and specific knowledge of local circumstances.',
      'The weaponization of the obese body in Taddeo\u2019s Hell thus offers a case study in the political instrumentalization of religious imagery. It demonstrates that the medieval artist\u2019s treatment of the human body was not merely a matter of style or convention but could be a deliberate rhetorical strategy\u2014a means of making arguments, settling scores, and shaping the moral landscape of a community. In the Collegiata of San Gimignano, every time a congregant passed beneath the bloated, suffering gluttons on the entrance wall, they received not only a reminder of the wages of sin but also a pointed commentary on the failings of those who claimed to preach against it.',
    ],
  },
  {
    id: 'acknowledgements',
    title: 'Acknowledgements',
    paragraphs: [
      'I am grateful to the <em>Opera della Primaziale Pisana</em> and the <em>Museo Civico di San Gimignano</em> for facilitating access to the frescoes discussed in this paper. Earlier versions of this argument were presented at the Renaissance Society of America Annual Meeting and at the Medieval Academy of America, and I thank the respondents and audience members at both venues for their generous and constructive feedback. I am also indebted to two anonymous reviewers for their careful reading of the manuscript and their valuable suggestions for revision.',
    ],
  },
];

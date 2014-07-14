SELECT p.partID, p.name, bp.wear, p.price, g.name FROM 
buypart bp 
LEFT JOIN parts p ON bp.partID = p.partID
LEFT JOIN partgroups g ON g.partGroupID = p.partGroupID
WHERE p.status = 0;
;